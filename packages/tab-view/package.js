Package.describe({
  name: 'jamielob:tab-view',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Individual "Views" for each tab.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');

  //Meteor packages
  api.use('ecmascript');
  api.use('templating', 'client');
  api.use('session', 'client');
  api.use('tracker', 'client');
  api.use('jquery', 'client');

  //Other packages use
  api.use('kadira:flow-router', 'client');
  api.use('kadira:blaze-layout', 'client');
  api.use('gwendall:body-events@0.1.6', 'client');

  //Other packages imply
  api.imply('kadira:flow-router', 'client');
  api.imply('kadira:blaze-layout', 'client');

  //Files
  api.mainModule('tab-view.js', 'client');
  api.addFiles('tab-view.html', 'client');
  api.addFiles('tab-view.css', 'client');

  //Export
  api.export('tabView');

});

