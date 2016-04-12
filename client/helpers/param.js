Template.registerHelper("queryParam", function(name) {
	return FlowRouter.getQueryParam(name);
});