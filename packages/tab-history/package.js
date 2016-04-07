Package.describe({
  name: 'jamielob:tab-history',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Remember the history and which tab view they came from',
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
  api.use('tracker', 'client');
  api.use('session', 'client');
  api.use('templating', 'client');
  api.use('jquery', 'client');

  //Other packages use
  api.use('kadira:flow-router', 'client');
  api.use('gwendall:body-events@0.1.6', 'client');

  //Files
  api.mainModule('tab-history.js', 'client');

  //Export
  api.export('tabHistory');

});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('jamielob:tab-history');
//   api.mainModule('tab-history-tests.js');
// });
