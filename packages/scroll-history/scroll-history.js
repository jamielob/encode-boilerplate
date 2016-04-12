scrollHistoryPositions = {};

scrollHistory = function(jQueryObject, conditions) {

	//Get the current route
	const routeName = location.href;

	//Monitor the scroll
	jQueryObject.scroll(function(event) {
		
		//Save the new position
		var scrollPosition = jQueryObject.scrollTop();
		scrollHistoryPositions[routeName] = scrollPosition;

	});

	//If there are conditions passed in, make sure they are all true
	if (conditions) {
		let conditionsMet = false;
		_.each(conditions, function(condition) {
			//If any of them are true, then the condition is met
			if (condition) conditionsMet = true;		
		});

		//If the conditions aren't met, then quit
		if (!conditionsMet) return false;
	}

	//Add a temp div so that the scrolling works even when all content isn't loaded
	jQueryObject.append('<div id="scrollHistoryTempDiv" style="height:10000px;"></div>');

	//Scroll to the last position
	jQueryObject.scrollTop(scrollHistoryPositions[routeName]);

	//Remove the temp div
	Meteor.setTimeout(function() {
		jQueryObject.find('#scrollHistoryTempDiv').remove();
	}, 500);

}
