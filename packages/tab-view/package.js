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

  //Other packages
  api.use('kadira:flow-router', 'client');

  //Files
  api.mainModule('tab-view.js', 'client');
  api.addFiles('tab-view.html', 'client');
});



// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('jamielob:tab-view');
//   api.mainModule('tab-view-tests.js');
// });
