#Tab History - Separate history states for each tab

##Installation

`meteor add jamielob:tab-history`

##Prerequisites

Tab history is designed for use with the `jamielob:tab-view` package.

##Setup


##Back button

To use a button as a back button simply add the `tab-history-back` attribute.

For example:

```
<a tab-history-back>Back</a>
```

If you want to step back in the history more than 1 hop, you can pass an optional value in:

```
<a tab-history-back="3">Back</a>
```

The above code will go back in the tab's history 3 items.

