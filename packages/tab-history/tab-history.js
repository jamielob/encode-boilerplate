//Set up tabHistory object	
tabHistory = {};

// //Set up the possible tabs
tabHistory[1] = new ReactiveArray;
tabHistory[2] = new ReactiveArray;
tabHistory[3] = new ReactiveArray;
tabHistory[4] = new ReactiveArray;
tabHistory[5] = new ReactiveArray;

//Set up a global history (so we can track outside of the tabs, like onboarding, for the hardware button)
tabHistory['global'] = [];

//Set up a flag for going back in history 
let goingBack = false;

//Current tab flag
let currentTab;

//Track global history so we can access it
FlowRouter.triggers.exit(function(context, redirect) {

	//Check direction
	if (goingBack) {

		//Remove the last item in the global history
		tabHistory['global'].pop();


		//If we have a current tab
		if (currentTab) {

			//Then pop from that tab's history
			let thisTabHistory = tabHistory[currentTab].get();
		 	thisTabHistory.pop();
		 	tabHistory[currentTab].set(thisTabHistory);

		}

		//Reset going Back flag
		goingBack = false;

	} else {

		//Add to global history
		tabHistory['global'].push(context.path);

		//Check if we are leaving a tab page
		const outgoingTab = context.queryParams.tab;

		//If we're leaving a page that isn't a tab base page AND we have a current tab
		if (!outgoingTab && currentTab) {

			//Then add it to that tab's history
			tabHistory[currentTab].push(context.path);

		}

	}

});

//Set current tab on click on a tab button
Template.body.events({
	'click [tab-view]': function (event, template) {
		//Defer so we wait for the dom
		Meteor.defer(function() {
			//Set the currentTab
			currentTab = $(event.currentTarget).attr('tab-view');

			//Pop one off the end of this tab's history.
		 	let thisTabHistory = tabHistory[currentTab].get();
		 	thisTabHistory.pop();
		 	tabHistory[currentTab].set(thisTabHistory);

		});
		
	}
});

//Set current tab on enter of a tab page - we do both this and the click to cover all situations - for example, this will cover when FlowRouter routes to a base tab without the user clicking a tab button
FlowRouter.triggers.enter(function(context, redirect) {

	//When we enter a tab, set the currentTab
	const incomingTab = context.queryParams.tab;
 	if (incomingTab) currentTab = incomingTab;

 	//Reset this tab's history since we're at the root again (helps with hardware back button)
 	tabHistory[currentTab].set([]);
 
	//When we're going back within the tab history, and get to the the begininning (empty), remove the currentTab

}, { only: ["tabView"] });





//Watch for back clicks
Template.body.events({
	'click [tab-history-back]': function (event, template) {
		
		//Set the goingBack flag
		goingBack = true;

		//Check if we've got a currentTab
		if (currentTab) {

			//Get the tab's history
			const thisTabHistory = tabHistory[currentTab].get();
			
			//If there are items in the tab history
			if (thisTabHistory.length) {
				//Get the last path in the global history
				const lastTabPath = _.last(thisTabHistory);
				FlowRouter.go(lastTabPath);
			} else {
				//Otherwise go back to the base
				FlowRouter.go('/tabView?tab=' + currentTab);
			}

		} else {

			//Get the last path in the global history
			const lastPath = _.last(tabHistory['global']);
			FlowRouter.go(lastPath);

		}

	}
});

//Listen for back buttons
document.addEventListener("backbutton", function() {

	//Check for history
	if (tabHistory['global'].length) {

		//Set the goingBack flag
		goingBack = true;

		//Get the last path in the history
		const lastPath = _.last(tabHistory['global']);
		FlowRouter.go(lastPath);

	} else {

		//If there's no history, then exit the app
		navigator.app.exitApp();

	}

}, false);


Template.registerHelper('tabPath', function(tabNumber) {

	//Check for a history in this tab
	if (tabHistory[tabNumber].getLength()) {
		//Return the last path in this tab's history
		return _.last(tabHistory[tabNumber].get());
	} else {
		//Otherwise just return the base tab
		return '/tabView?tab=' + tabNumber;

	}
});


// function addParameterToURL(url, param){
//     url += (url.split('?')[1] ? '&':'?') + param;
//     return url;
// }



// //Check if we're coming in to a tab so we can re-direct accordingly
// FlowRouter.triggers.enter(function(context, redirect) {
	
// 	//Don't need to do this if we're going backwards
// 	if (goingBack) return;

// 	//Check if we've entered a tab
// 	const incomingTab = context.queryParams.tab;
// 	if (incomingTab) {

// 		//console.log('tab reset!');
// 		return;

// 	}

// 	//If we're at the beginning of the history, then don't need to do anything
// 	if (!tabHistory['global'].length) return;

// 	//Check where we came from
// 	const lastPath = _.last(tabHistory['global']);

// 	//Check if the last path had a tab query param
// 	if (lastPath.includes('tab=')) {

// 		//If it did, check which tab
// 		const tabNumber = getTabFromUrl(lastPath);

// 		//Generate the new path with the tab number
// 		const newPath = addParameterToURL(context.path, 'tab='+tabNumber);

// 		//Redirect
// 		redirect(newPath);

// 		// //Defer so it's after the inistial query params are set
// 		// Meteor.defer(function() {
// 		// 	//Skip adding to history when we redirect
// 		// 	skipHistory = true;
// 		// 	//Add the query param
// 		// 	FlowRouter.setQueryParams({tab: tabNumber});
// 		// });
// 	}

// });



// function getTabFromUrl(url) {
//     var match = RegExp('[?&]tab=([^&]*)').exec(url);
//     return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
// }




// //Check which page we should be showing on entry of a tabbed route (and redirect to it)
// FlowRouter.triggers.enter(function(context, redirect) {

// 	//Get the tab that was clicked on
// 	const incomingTab = context.queryParams.tab; 

// 	//If the incoming tab is the same as the tab we're currently on (the second click on the tab button) - then we need to clear the history and not redirect
// 	if (incomingTab === Session.get('tabViewCurrent')) {
// 		tabHistory[incomingTab] = [];
// 		return true;
// 	}

// 	//Make sure we have a tab
// 	if (!incomingTab) return;

// 	//Save the tab itself to the tab history, unless skipHistory was set
// 	if (!skipHistory) tabHistory['tabs'].push(incomingTab);

// 	//Check if there is any history to wory about for this tab
// 	if (!tabHistory[incomingTab].length) return;

// 	//Get the last item in this tab's history
// 	const lastItemPos = tabHistory[incomingTab].length - 1;
// 	const lastItem = tabHistory[incomingTab][lastItemPos];

// 	//Skip saving the history until after we've redirected
// 	skipHistory = true;

// 	//Save the incoming tab as the current tab (tab-view won't do this because we redirect before it can trigger)
// 	Session.set('tabViewCurrent', incomingTab);

// 	//Redirect the the correct tab
// 	redirect(lastItem);


// }, {only: ["tabView"]});




// //Watch for route changes within each of the tabs so we can save it to the history
// Tracker.autorun(function () {
	
// 	//Run every time we change routes
// 	const watchThis = FlowRouter.watchPathChange();

// 	//Check for the skip flag
// 	if (skipHistory) {
// 		//Reset the flag
// 		skipHistory = false;
// 		return;
// 	}

// 	//Get the current path we need to save
// 	const currentPath = FlowRouter.current().path;

// 	//Check for a path
// 	if (!currentPath) return;

// 	//Check direction
// 	if (goingBack) {
// 		//Pop
// 		tabHistory['global'].pop();
// 	} else {
// 		//Save
// 		tabHistory['global'].push(currentPath);
// 	}
// 	goingBack = false;
// 	console.log(tabHistory['global']);

// 	//Make sure we're not on the tab itself (don't need to save that to history)
// 	if (FlowRouter.getRouteName() === 'tabView') return;

// 	//Get the current tab view we're in
// 	const tabViewCurrent = Session.get('tabViewCurrent');

	

// 	//Make sure there's a current path
// 	if (typeof currentPath === "undefined") return;

// 	//Save it to the tabHistory
// 	tabHistory[tabViewCurrent].push(currentPath);

// });


// //Watch for back clicks
// Template.body.events({
// 	'click [tab-history-back]': function (event, template) {
// 		//Get number of hops
// 		let hops = $(event.currentTarget).attr('tab-history-back');
// 		//Go back
// 		goBack(hops);
// 	}
// });


// //Listen for back buttons
// document.addEventListener("backbutton", function() {
// 	goBack();
// }, false);


// const goBack = (hops) => {

// 	//Get the current tab view we're in
// 	//const tabViewCurrent = FlowRouter.current().queryParams.tab; //Need to get it this way because nothing else is set yet on enter
// 	const tabViewCurrent = Session.get('tabViewCurrent');

// 	//If there are no hops, default to 1
// 	if (!hops) hops = 1;

// 	//Skip saving the history until after we've reached our destination in history
// 	skipHistory = true;

// 	//Get the item in this tab's history
// 	const itemPos = tabHistory[tabViewCurrent].length - 1 - hops;  //Last item (1) is the current page.  We keep this in history so we can go to when navigating to that tab
// 	const item = tabHistory[tabViewCurrent][itemPos];

// 	//Remove those items from the history
// 	tabHistory[tabViewCurrent].splice(-hops, hops);

// 	//If there's no item in the history
// 	if (typeof item === "undefined") {
// 		//Create tab url
// 		const tabDestination = '/tabView?tab=' + tabViewCurrent;

// 		//Check if we're already on the tab
// 		if (FlowRouter.current().path === tabDestination) {
			
// 			//Pop one from the tabs history
// 			tabHistory['tabs'].pop();

// 			//If there are still items in the tabs history
// 			if (tabHistory['tabs'].length) {
// 				// go to the lastTab
// 				const lastTabPos = tabHistory['tabs'].length - 1 ; 
// 				const lastTab = tabHistory['tabs'][lastTabPos];
// 				FlowRouter.go('/tabView?tab=' + lastTab);
// 			} else {
// 				console.log('asdf');
// 			}
			
			
// 			//Just go back in the normal history - this works because this will only happen with a hardware back button
// 			//	history.go(-1);
// 		} else {
// 			//if not, then just go back to the tab
// 			FlowRouter.go(tabDestination);
// 		}
// 	} else {
// 		//Otherwise go back in history to the item
// 		FlowRouter.go(item);
// 	}

// }




