//Set up tabHistory object
tabHistory = {};

//Set up the possible tabs
tabHistory[1] = [];
tabHistory[2] = [];
tabHistory[3] = [];
tabHistory[4] = [];
tabHistory[5] = [];

//Set up a place to save history of the tabs themselves (for hardware back button)
tabHistory['tabs'] = [];

//Set up a global history (so we can track outside of the tabs, like onboarding, for the hardware button)
tabHistory['global'] = [];

//Set up the skipHistory flag - used when redirecting and we don't want to save to the history
let skipHistory = false;

//Set up a flag for going back in history 
let goingBack = false;



//Check which page we should be showing on entry of a tabbed route (and redirect to it)
FlowRouter.triggers.enter(function(context, redirect) {

	//Get the tab that was clicked on
	const incomingTab = context.queryParams.tab; 

	//If the incoming tab is the same as the tab we're currently on (the second click on the tab button) - then we need to clear the history and not redirect
	if (incomingTab === Session.get('tabViewCurrent')) {
		tabHistory[incomingTab] = [];
		return true;
	}

	//Make sure we have a tab
	if (!incomingTab) return;

	//Save the tab itself to the tab history, unless skipHistory was set
	if (!skipHistory) tabHistory['tabs'].push(incomingTab);

	//Check if there is any history to wory about for this tab
	if (!tabHistory[incomingTab].length) return;

	//Get the last item in this tab's history
	const lastItemPos = tabHistory[incomingTab].length - 1;
	const lastItem = tabHistory[incomingTab][lastItemPos];

	//Skip saving the history until after we've redirected
	skipHistory = true;

	//Save the incoming tab as the current tab (tab-view won't do this because we redirect before it can trigger)
	Session.set('tabViewCurrent', incomingTab);

	//Redirect the the correct tab
	redirect(lastItem);


}, {only: ["tabView"]});




//Watch for route changes within each of the tabs so we can save it to the history
Tracker.autorun(function () {
	
	//Run every time we change routes
	const watchThis = FlowRouter.watchPathChange();

	//Check for the skip flag
	if (skipHistory) {
		//Reset the flag
		skipHistory = false;
		return;
	}

	//Get the current path we need to save
	const currentPath = FlowRouter.current().path;

	//Check for a path
	if (!currentPath) return;

	//Check direction
	if (goingBack) {
		//Pop
		tabHistory['global'].pop();
	} else {
		//Save
		tabHistory['global'].push(currentPath);
	}
	goingBack = false;
	console.log(tabHistory['global']);

	//Make sure we're not on the tab itself (don't need to save that to history)
	if (FlowRouter.getRouteName() === 'tabView') return;

	//Get the current tab view we're in
	const tabViewCurrent = Session.get('tabViewCurrent');

	

	//Make sure there's a current path
	if (typeof currentPath === "undefined") return;

	//Save it to the tabHistory
	tabHistory[tabViewCurrent].push(currentPath);

});


//Watch for back clicks
Template.body.events({
	'click [tab-history-back]': function (event, template) {
		//Get number of hops
		let hops = $(event.currentTarget).attr('tab-history-back');
		//Go back
		goBack(hops);
	}
});


//Listen for back buttons
document.addEventListener("backbutton", function() {
	goBack();
}, false);


const goBack = (hops) => {

	//Get the current tab view we're in
	//const tabViewCurrent = FlowRouter.current().queryParams.tab; //Need to get it this way because nothing else is set yet on enter
	const tabViewCurrent = Session.get('tabViewCurrent');

	//If there are no hops, default to 1
	if (!hops) hops = 1;

	//Skip saving the history until after we've reached our destination in history
	skipHistory = true;

	//Get the item in this tab's history
	const itemPos = tabHistory[tabViewCurrent].length - 1 - hops;  //Last item (1) is the current page.  We keep this in history so we can go to when navigating to that tab
	const item = tabHistory[tabViewCurrent][itemPos];

	//Remove those items from the history
	tabHistory[tabViewCurrent].splice(-hops, hops);

	//If there's no item in the history
	if (typeof item === "undefined") {
		//Create tab url
		const tabDestination = '/tabView?tab=' + tabViewCurrent;

		//Check if we're already on the tab
		if (FlowRouter.current().path === tabDestination) {
			
			//Pop one from the tabs history
			tabHistory['tabs'].pop();

			//If there are still items in the tabs history
			if (tabHistory['tabs'].length) {
				// go to the lastTab
				const lastTabPos = tabHistory['tabs'].length - 1 ; 
				const lastTab = tabHistory['tabs'][lastTabPos];
				FlowRouter.go('/tabView?tab=' + lastTab);
			} else {
				console.log('asdf');
			}
			
			
			//Just go back in the normal history - this works because this will only happen with a hardware back button
			//	history.go(-1);
		} else {
			//if not, then just go back to the tab
			FlowRouter.go(tabDestination);
		}
	} else {
		//Otherwise go back in history to the item
		FlowRouter.go(item);
	}

}




