#Tab View

Easy tabbed views for mobile

##Installation

`meteor add jamielob:tab-view`

##Pre-requisites

This plugin uses `FlowRouter` and `BlazeLayout` and exposes them for your use with `imply`.

##Setup

Simply add the following line to the main body of your app:

```
{{>tabView template1="tab1" template2="tab2" template3="tab3" template4="tab4" template5="tab5"}}
```

Where `tab1, tab2, etc` are the names of the templates you would like to be shown initially at each tab position.

Tab View supports up to 5 tabs, but can function with as little as 2.

##Switching between tabs

To switch between tabs you'll use the `/tabView` route and the `tab` parameter.  Each of the tabs must have the `tab-view` attribute too.	

For example:

```
<a href="/tabView?tab=1" tab-view="1">Tab 1</a>
<a href="/tabView?tab=2" tab-view="2">Tab 2</a>
<a href="/tabView?tab=3" tab-view="3">Tab 3</a>
<a href="/tabView?tab=4" tab-view="4">Tab 4</a>
```

##Styling

You'll need to set up your own styling for the tab buttons themselves.  Check out the demo for ideas on how to do this.

Each template will need to be wrapped in a div that positions it absolutely. This package provides a `.tab-view-content` class that does this for you, or you can roll your own.

For example, the `tab1` template might look like:


```
<template name="tab1">
	<div class="tab-view-content">
		<h1>Tab 1 Title</h1>
		<p>Tab 1 content</p>
	</div>
</template>
```

##Indicating the current tab

A `{{tabViewCurrent}}` helper is made available for you for this purpose.  Using CSS you can highlight which of the tab buttons is active.  First, wrap your tab buttons in a div that contains the helper as a class.  Since it returns just a number, you'll have to prepend it:

```
<div class="active-tab-{{tabViewCurrent}}">
	<a href="/tabView?tab=1" tab-view="1">Tab 1</a>
	<a href="/tabView?tab=2" tab-view="2">Tab 2</a>
	<a href="/tabView?tab=3" tab-view="3">Tab 3</a>
	<a href="/tabView?tab=4" tab-view="4">Tab 4</a>
</div>
```

And then in your CSS you can use something like this to highlight the current tab:

```
.active-tab-1 [tab-view="1"],
.active-tab-2 [tab-view="2"],
.active-tab-3 [tab-view="3"],
.active-tab-4 [tab-view="4"],
.active-tab-5 [tab-view="5"] {
	font-weight: bold;
	background-color: #000;
}
```

##Scrolling to top

If you would like the tab button to scroll your content back to the top, if the user is already on that tab, then you'll just need to tell the package the element you'd like to scroll.

Create a `tabView.js` or similar file in your client lib folder and include the following:

```
tabView.scrollContent = '.content';
tabView.scrollSpeed = 1000;
```

`scrollContent` is the jQuery selector of your scrollable content.  `scrollSpeed` is optional, with the default at `300`.

##Keeping separate navigation per tab

If you're looking to also replicate the popular UI of keeping a separate "view" per tab, check out the `jamielob:tab-history` package.

##Remembering scroll position

Each of the tabs will automatically remember state and scroll position as they are not removed from memory, but simply hidden from view.  This is great because your "heaviest" content is usually contained at the base level of the tabs.  

If you're looking to also remember scroll position on other pages, check out the `jamielob:scroll-history` package.


> Created by Jamie Loberman in conjunction with Encode.fi

