tabView = {};

//Set default tab
Session.setDefault('tabViewCurrent', 1);

//Create the tabsView Route
FlowRouter.route('/tabView', {
    name: 'tabView',
    action: function() {
        //Set the default tab
        if (!FlowRouter.getQueryParam('tab')) FlowRouter.setQueryParams({'tab': 1 });
        BlazeLayout.render(null);
    }
});

//Watch for tab pages changes (FlowRouter is reactive but we can't put Session in the action)
Tracker.autorun(function () {
	//Get the current tab param
	let tab = FlowRouter.getQueryParam("tab");
	//If we've got the param
	if (tab) {
		//Save it
		Session.set('tabViewCurrent', tab);
		//Unhide the tabs
		Session.set('tabViewVisible', 'tab-view-show');		
	} else {
		//Hide the tabs
		Session.set('tabViewVisible', 'tab-view-hide');		
	}
});


//Set current tab on click on a tab button - this
Template.body.events({
	'click [tab-view]': function (event, template) {
		//Defer so we wait for the dom
		Meteor.defer(function() {
			//Set the currentTab
			const incomingTab = $(event.currentTarget).attr('tab-view');
			Session.set('tabViewCurrent', incomingTab);
		});

		//Set the fromTab flag
		tabView.fromTab = true;
		//Reset the fromTabClick
		Meteor.setTimeout(function() {
			tabView.fromTab = false;
		}, 500);

	}
});

//Current tab template helper
Template.registerHelper('tabViewCurrent', function() {
	return Session.get('tabViewCurrent');
});

//Tab hide template helper
Template.registerHelper('tabViewHide', function() {
	return Session.get('tabViewHide');
});


