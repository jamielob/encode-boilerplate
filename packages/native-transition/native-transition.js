nativeTransition = {};
nativeTransition.defaults = {};

nativeTransition.transition = (options) => {

		//Check if we have the native transitions cordova package
		if (!window || !window.plugins || !window.plugins.nativepagetransitions) return;

		//Merge together the defaults plus the options passed in
		let mergedOptions = {};
		mergedOptions = _.extend( mergedOptions, nativeTransition.defaults, options );

		//Check for a type
		let type;
		if (mergedOptions.type) {
			type = mergedOptions.type;
			delete mergedOptions.type;
		} else {
			type = 'slide'
		}

		//Run the transtion
		window.plugins.nativepagetransitions[type](mergedOptions);

}


$(document).ready(function() {

	$(document.body).on('click', '[native-transition]', function(event) {

			//Check if we have the native transitions cordova package
			if (!window || !window.plugins || !window.plugins.nativepagetransitions) return;

			//Grab options from the html element
			let options = $(event.currentTarget).attr('native-transition');
			if (options) {
				//Parse it
				options = JSON.parse(options);
			} else {
				options = {};
			}

			nativeTransition.transition(options);

	});

});

