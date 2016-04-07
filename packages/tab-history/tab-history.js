//Set up tabHistory object
tabHistory = {};

//Set up the skipHistory flag - used when redirecting and we don't want to save to the history
var skipHistory = false;

//Set up the possible tabs
tabHistory[1] = [];
tabHistory[2] = [];
tabHistory[3] = [];
tabHistory[4] = [];
tabHistory[5] = [];


//Check which page we should be showing on entry of a tabbed route
FlowRouter.triggers.enter(function(context, redirect) {

	const incomingTab = FlowRouter.current().queryParams.tab; //Need to get it this way because nothing else is set yet on enter

	//Check if there is any history
	if (!tabHistory[incomingTab].length) return;

	//Get the last item in this tab's history
	const lastItemPos = tabHistory[incomingTab].length - 1;
	const lastItem = tabHistory[incomingTab][lastItemPos];

	//Skip saving the history until after we've redirected
	skipHistory = true;

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

		//Get number of hops
		let hops = $(event.currentTarget).attr('tab-history-back');

		//If there are no hops, default to 1
		if (!hops) hops = 1;

		console.log(hops);
	}
});

