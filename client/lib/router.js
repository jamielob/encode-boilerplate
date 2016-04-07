//Tabs
FlowRouter.route('/', {
    name: 'default',
    action: function() {
        FlowRouter.go('tabView');
    }
});

FlowRouter.route('/item', {
    name: 'item',
    action: function() {
        BlazeLayout.render('item');
    }
});


