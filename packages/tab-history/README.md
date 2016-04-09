#Tab History - Separate history states for each tab

This package keeps track of a separate history for each tab view.  This means you can navigate to a different tab and return to the same page you left at.  A second tap of the tab button returns you back to the tab base page.  This UI pattern can be found in apps like Instagram and Twitter.

##Installation

`meteor add jamielob:tab-history`

##Prerequisites

Tab history is designed for use with the `jamielob:tab-view` package.

##Setup

No setup is required.  As soon as you add the package, the history state of each tab will be remembered.


##Back button

To use a link as a back button simply add the `tab-history-back` attribute.

For example:

```
<a tab-history-back>Back</a>
```

If you want to step back in the history more than 1 hop, you can pass an optional value in:

```
<a tab-history-back="3">Back</a>
```

The above code will go back in the tab's history 3 items.


##Known limitations

If you navigate several layers deep inside a tab, navigate away and then use the hardware back button to go back. The next time that you go to that tab, you may end being returned to the last place in that tab's history before the hardware back button.  This doens't occur if at any point you reach the tab root using the hardware button.

> Created by Jamie Loberman in conjunction with Encode.fi
