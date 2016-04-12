scrollHistoryPositions = {};

scrollHistory = function(jQueryObject, conditions) {

	//Wait for the Dom AND the URL - without this, the location.href sometimes picks up the previous route
	Meteor.defer(function() {

		//Get the current route
		const routeName = location.href;

		let conditionsMet = true;

		//If there are conditions passed in, make sure at least one is met
		if (conditions) {
			conditionsMet = false;
			_.each(conditions, function(condition) {
				//If any of them are true, then the condition is met
				if (condition) conditionsMet = true;		
			});
		}


		//As long as the conditions are met, then make the scroll
		if (conditionsMet) {

			//Add a temp div so that the scrolling works even when all content isn't loaded
			jQueryObject.append('<div id="scrollHistoryTempDiv" style="height:100000px;"></div>');

			//Scroll to the last position
			jQueryObject.scrollTop(scrollHistoryPositions[routeName]);

			//Remove the temp div
			Meteor.setTimeout(function() {
				jQueryObject.find('#scrollHistoryTempDiv').remove();
			}, 500);

		}


		//Monitor the scroll
		jQueryObject.scroll(function(event) {
			
			//Save the new position
			var scrollPosition = jQueryObject.scrollTop();
			scrollHistoryPositions[routeName] = scrollPosition;

		});

	});

}
