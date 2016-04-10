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
tabHistory.goingBack = false;

//Current tab flag
currentTab = new ReactiveVar; 

//Track global history so we can access it
FlowRouter.triggers.exit(function(context, redirect) {

	//Check direction
	if (tabHistory.goingBack) {

		//Remove the last item in the global history
		tabHistory['global'].pop();


		//If we have a current tab
		if (currentTab.get()) {

			//Then pop from that tab's history
			let thisTabHistory = tabHistory[currentTab.get()].get();
		 	thisTabHistory.pop();
		 	tabHistory[currentTab.get()].set(thisTabHistory);

		}

		//Reset going back flag
		Meteor.defer(function() {
			tabHistory.goingBack = false;
		});

	} else {

		//Add to global history
		tabHistory['global'].push(context.path);

		//Check if we are leaving a tab page
		const outgoingTab = context.queryParams.tab;

		//If we're leaving a page that isn't a tab base page AND we have a current tab
		if (!outgoingTab && currentTab.get()) {

			//Then add it to that tab's history
			tabHistory[currentTab.get()].push(context.path);

		}

	}

});

//Set current tab on click on a tab button
Template.body.events({
	'click [tab-view]': function (event, template) {
		//Defer so we wait for the dom
		Meteor.defer(function() {
			//Set the currentTab
			const incomingTab = $(event.currentTarget).attr('tab-view');
			currentTab.set(incomingTab);

			//Pop one off the end of this tab's history.
		 	let thisTabHistory = tabHistory[incomingTab].get();
		 	thisTabHistory.pop();
		 	tabHistory[incomingTab].set(thisTabHistory);

		});
		
	}
});

//Set current tab on enter of a tab page - we do both this and the click to cover all situations - for example, this will cover when FlowRouter routes to a base tab without the user clicking a tab button
FlowRouter.triggers.enter(function(context, redirect) {

	//When we enter a tab, set the currentTab
	const incomingTab = context.queryParams.tab;
 	if (incomingTab) currentTab.set(incomingTab);

 	//Reset this tab's history since we're at the root again (helps with hardware back button)
 	tabHistory[currentTab.get()].set([]);
 
	//When we're going back within the tab history, and get to the the begininning (empty), remove the currentTab

}, { only: ["tabView"] });


//Watch for back clicks
Template.body.events({
	'click [tab-history-back]': function (event, template) {
		
		//Set the goingBack flag
		tabHistory.goingBack = true;

		//Check if we've got a currentTab
		if (currentTab.get()) {

			//Get the tab's history
			const thisTabHistory = tabHistory[currentTab.get()].get();
			
			//If there are items in the tab history
			if (thisTabHistory.length) {
				//Get the last path in the global history
				const lastTabPath = _.last(thisTabHistory);
				FlowRouter.go(lastTabPath);
			} else {
				//Otherwise go back to the base
				FlowRouter.go('/tabView?tab=' + currentTab.get());
			}

		} else {

			//Check if we have a global history 
			if (tabHistory['global'].length) {

				//Get the last path in the global history
				const lastPath = _.last(tabHistory['global']);
				FlowRouter.go(lastPath);

			} else {

				//Probably after a hot code push, just go back to the first tab
				FlowRouter.go('/tabView?tab=1');

			}
			

		}

	}
});

//Listen for back buttons
document.addEventListener("backbutton", function() {

	//Check for history
	if (tabHistory['global'].length) {

		//Set the goingBack flag
		tabHistory.goingBack = true;

		//Get the last path in the history
		const lastPath = _.last(tabHistory['global']);
		FlowRouter.go(lastPath);

	} else {

		//If there's no history, then exit the app
		navigator.app.exitApp();

	}

}, false);


//Tab path helper, saves having to do any funky redirects which will interfere with transitions
Template.registerHelper('tabPath', function(tabNumber) {

	//Check if the current tab is the same as this tab
	if (currentTab.get() === tabNumber) {
		//Return the base tab
		return '/tabView?tab=' + tabNumber;
	}

	//Check for a history in this tab
	if (tabHistory[tabNumber].getLength()) {
		//Return the last path in this tab's history
		return _.last(tabHistory[tabNumber].get());
	} else {
		//Otherwise just return the base tab
		return '/tabView?tab=' + tabNumber;

	}
});



