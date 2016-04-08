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

FlowRouter.route('/item2', {
    name: 'item2',
    action: function() {
        BlazeLayout.render('item2');
    }
});
