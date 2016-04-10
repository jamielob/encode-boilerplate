Template.body.events({
	'click [native-transition]': function (event, template) {
		
		//Check if we have the native transitions cordova package
		if (!window || !window.plugins || !window.plugins.nativepagetransitions) return;

		//Set up options
		let options;

		//Grab options from the html element
		options = $(event.currentTarget).attr('native-transition');
		if (options) {
			//Parse it
			options = JSON.parse(options);
		} else {
			//Defaults
			options = {};
		}

		options.androiddelay = 0;

		//Run the transtion
		window.plugins.nativepagetransitions.slide(options);

	}
});

