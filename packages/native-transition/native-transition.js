nativeTransition = {};
nativeTransition.defaults = {};

nativeTransition.transition = (options) => {

		//Check if we have the native transitions cordova package
		if (!window || !window.plugins || !window.plugins.nativepagetransitions) return;

		//Merge together the defaults plus the options passed in
		let mergedOptions = {};
		mergedOptions = _.extend( mergedOptions, nativeTransition.defaults, theseOptions );

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

Template.body.events({
	'click [native-transition]': function (event, template) {

		//Check if we have the native transitions cordova package
		if (!window || !window.plugins || !window.plugins.nativepagetransitions) return;

		//Grab options from the html element
		let theseOptions = $(event.currentTarget).attr('native-transition');
		if (theseOptions) {
			//Parse it
			theseOptions = JSON.parse(theseOptions);
		} else {
			//Empty
			theseOptions = {};
		}

		nativeTransition.transtion(theseOptions);


	}
});

