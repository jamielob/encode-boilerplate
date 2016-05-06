#Tab History

This package keeps track of a separate history for each tab view.  This means you can navigate to a different tab and return to the same page you left at.  A second tap of the tab button returns you back to the tab base page.  This UI pattern can be found in apps like Instagram and Twitter.

##Installation

`meteor add jamielob:tab-history`

##Prerequisites

Tab history is designed for use with the `jamielob:tab-view` package.

##Setup

You'll need to use the `{{tabPath}}` helper as the URL for your tab buttons.  This will ensure the correct tab history page is shown.

```
<a href="{{tabPath '1'}}" tab-view="1">Tab 1</a>
<a href="{{tabPath '2'}}" tab-view="2">Tab 2</a>
<a href="{{tabPath '3'}}" tab-view="3">Tab 3</a>
<a href="{{tabPath '4'}}" tab-view="4">Tab 4</a>
```
Be sure to include the `tab-view` attribute as usual.


##Back button

To use a link as a back button simply add the `tab-history-back` attribute.

For example:

```
<a tab-history-back>Back</a>
```

Include the code below to intercept the hardware back button.

```
//Listen for hardware back button
document.addEventListener("backbutton", (event) => {
  event.preventDefault();
  event.stopPropagation();

  //Go back
  tabHistory.goBack();
}, false);
```




##Known limitations

If you navigate several layers deep inside a tab, navigate away and then use the hardware back button to go back. The next time that you go to that tab, you may end being returned to the last place in that tab's history before the hardware back button.  This doens't occur if at any point you reach the tab root using the hardware button.

> Created by Jamie Loberman in conjunction with Encode.fi
