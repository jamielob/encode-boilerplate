# Native Transtion

True native transitions for your Meteor mobile apps.   Degrades gracefully on desktop (i.e. transitions only on mobile devices).

## Installation

`meteor add jamielob:native-transition`

## Prerequisites

None.  Under the hood it utilises the excellent [Native Page Transitions](http://plugins.telerik.com/cordova/plugin/native-page-transitions) cordova plugin.

## Use

After adding the package you can make any link transition by adding `native-transition` as an attribute:

```
<a href="/item" native-transition>Item</a>
```

This package will then pick up the link when it is tapped and make a transition using the defaults specified by the corodva plugin.  See below for how to set your own defualts.

If you want to set the options for a particular link, you can do that by passing in an object string:

```
<a href="/item" native-transition='{ "type": "flip", "direction": "left" }'>Item</a>
```

>Because of the way the object is parsed, you must use single quotes for the attribute and double quotes for the properties as shown.

For a full list of options and how to use them, check out the [cordova plugin readme](http://plugins.telerik.com/cordova/plugin/native-page-transitions).

You can also trigger a transition usign from your javascript.

```
nativeTransition.transition({ "type": "flip", "direction": "left" });
```

Immediately after calling the function above, navigate to a new page.

```
FlowRouter.go('/newPage');
// or
window.location('/newPage');
```


## Using Helpers

If you find yourself using a particular set of transition options multiple times, like with a fixed header and footer/tabs, you can place them in a global helper:

```
Template.registerHelper("fixedHeaderFixedFooter", function() {
  return '{ "fixedPixelsTop": 50, "fixedPixelsBottom": 50 }';
});
```

```
<a href="/item" class="button" native-transition={{fixedHeaderFixedFooter}}>Item</a>
```

## Defaults

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

## Hardware back button

Include the code below to intercept the hardware back button and transition.

```
//Listen for hardware back button
document.addEventListener("backbutton", (event) => {
  event.preventDefault();
  event.stopPropagation();

  //Initialize the transition
  nativeTransition.transition({ direction: 'right' });

  //Go back
  window.history.back();
}, false);
```

If you are using the `tab-history` package, be sure to use `tabHistory.goBack();` to navigate back instead of the default `window.history.back()`.


## Flashes and stutters

These can be caused by a couple of different things, but are usually to do with the content and scripts that are loading on the destiation page.  Either try defering anything heavy or try increding the delay values.

## Status Bar

You'll need to style your status bar to make things look nice.  Meteor already includes the StatusBar plugin, so you can just add a file to your client lib directory and style it however you want to match your app.  For example:

```
Meteor.startup(function() {
  if (Meteor.isCordova) {
    //Format the status bar
    StatusBar.overlaysWebView(false);
    StatusBar.styleLightContent();
    StatusBar.backgroundColorByHexString("#333");
  }
});
```

> Created by Jamie Loberman in conjunction with Encode.fi
