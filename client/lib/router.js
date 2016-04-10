//Tabs
FlowRouter.route('/', {
    name: 'default',
    action: function() {
        BlazeLayout.render('welcome');
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

FlowRouter.route('/item3', {
    name: 'item2',
    action: function() {
        BlazeLayout.render('item3');
    }
});
