#Native Transtion

True native transitions for your Meteor mobile apps.   Degrades gracefully on desktop (i.e. transitions only on mobile devices).

##Installation

`meteor add jamielob:native-transition`

##Prerequisites

This package should work with any router as it watches for taps and transitions based on URL changes. Under the hood it utilises the excellent [Native Page Transitions](http://plugins.telerik.com/cordova/plugin/native-page-transitions) cordova plugin.

##Use

After adding the package you can make any link transition by adding `native-transition` as an attribute:

```
<a href="/item" native-transition>Item</a>
```

This package will then pick up the link when it is tapped and make a transition using the defaults specified by the corodva plugin.  See below for how to set your own defualts.

If you want to set the options for a particular link, you can do that by passing in an object string:

```
<a href="/item" native-transition='{ "type": "flip", "direction": "left" }'>Item</a>
```

For a full list of options and how to use them, check out the [cordova plugin readme](http://plugins.telerik.com/cordova/plugin/native-page-transitions).

##Using Helpers

If you find yourself using a particular set of transition options multiple times, like with a fixed header and footer/tabs, you can place them in a global helper:

```
Template.registerHelper("fixedHeaderFixedFooter", function() {
	return '{ "fixedPixelsTop": 50, "fixedPixelsBottom": 50 }';
});
```

```
<a href="/item" class="button" native-transition={{fixedHeaderFixedFooter}}>Item</a>
```

##Defaults

In your client lib folder create a file to house the defaults you want to set.  You can then set any defaults you like, including:

```
nativeTransition.defaults.type = "slide";  
nativeTransition.defaults.direction = "left";
nativeTransition.defaults.duration = 400;
nativeTransition.defaults.slowdownfactor = 3;
nativeTransition.defaults.iosdelay = 60;
nativeTransition.defaults.androiddelay = 70;
nativeTransition.defaults.fixedPixelsTop = 0;
nativeTransition.defaults.fixedPixelsBottom = 0;
```

> Created by Jamie Loberman in conjunction with Encode.fi
