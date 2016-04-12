Template.item.onRendered(function() {

	const self = this;

	//Remember scroll position
	scrollHistory(self.$('.content'), [tabHistory.goingBack, tabView.fromTab]);

});
