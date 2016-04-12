#Scroll History

Easily remember the scroll state of a page and restore it.

##Installation

`meteor add jamielob:scoll-history`

##Prerequisites

Scroll history works with any scrollable page or div.

##Setup

In your `onRendered` callback simply call the `scrollHistory` function.   This function takes two parameters.

```
scrollHistory(jqueryObject, conditions);
```

The jquery object is whatever you want to track the scroll position of.  For example:

```
Template.templateName.onRendered(function() {
	scrollHistory( this.$('.content') );
});

```

The second parameter is an optional array, specifying any boolean variables that should have at least one satisfied before restoring the scroll.  This is useful when you want to only restore the scroll position when heading back or arriving from a tab. 

When used with the tabHistory and tabView packages, this would like like this:

```
Template.templateName.onRendered(function() {
	scrollHistory( this.$('.content'), [tabHistory.goingBack, tabView.fromTab] );
});

```

If only passing in one condition, be sure to still include it as an array.


> Created by Jamie Loberman in conjunction with Encode.fi
