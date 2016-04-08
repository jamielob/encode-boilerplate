Template.registerHelper("list", function(count) {
	if (!count) count = 100;
	return _.range(count);
});