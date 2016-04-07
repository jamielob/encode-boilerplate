#Tab View - Easy tabbed views for mobile

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

To switch between tabs you'll use the `/tabView` route and the `tab` parameter.

For example:

```
<a href="/tabView?tab=1">Tab 1</a>
<a href="/tabView?tab=2">Tab 2</a>
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

##Keeping separate navigation per tab

If you're looking to also replicate the popular UI of keeping a separate "view" per tab, check out the `jamielob:tab-history` package.


> Created by Jamie Loberman in conjunction with Encode.fi

