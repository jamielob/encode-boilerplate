//Set up tabHistory object
tabHistory = {};

//Set up the possible tabs
tabHistory[1] = [];
tabHistory[2] = [];
tabHistory[3] = [];
tabHistory[4] = [];
tabHistory[5] = [];

//Set up the skipHistory flag - used when redirecting and we don't want to save to the history
let skipHistory = false;

//Check which page we should be showing on entry of a tabbed route
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

	//Make sure we're not on the tab itself (don't need to save that to history)
	if (FlowRouter.getRouteName() === 'tabView') return;

	//Get the current tab view we're in
	const tabViewCurrent = Session.get('tabViewCurrent');

	//Get the current path we need to save
	const currentPath = FlowRouter.current().path;

	//Make sure there's a current path
	if (typeof currentPath === "undefined") return;

	//Save it to the tabHistory
	tabHistory[tabViewCurrent].push(currentPath);

});


//Watch for back clicks
Template.body.events({
	'click [tab-history-back]': function (event, template) {

		//Get the current tab view we're in
		//const tabViewCurrent = FlowRouter.current().queryParams.tab; //Need to get it this way because nothing else is set yet on enter
		const tabViewCurrent = Session.get('tabViewCurrent');

		//Get number of hops
		let hops = $(event.currentTarget).attr('tab-history-back');

		//If there are no hops, default to 1
		if (!hops) hops = 1;

		//Skip saving the history until after we've reached our destination in history
		skipHistory = true;

		//Get the item in this tab's history
		const itemPos = tabHistory[tabViewCurrent].length - 1 - hops;  //Last item (1) is the current page.  We keep this in history so we can go to when navigating to that tab
		const item = tabHistory[tabViewCurrent][itemPos];

		//Remove those items from the history
		tabHistory[tabViewCurrent].splice(-hops, hops);

		//If there's no item in the history, then just go back to the tab
		if (typeof item === "undefined") {
			FlowRouter.go('/tabView?tab=' + tabViewCurrent);
		} else {
			//Otherwise go back in history to the item
			FlowRouter.go(item);
		}

	}
});


