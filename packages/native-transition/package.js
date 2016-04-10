Package.describe({
  name: 'jamielob:native-transition',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Cordova.depends({
    //0.6.4
    'com.telerik.plugins.nativepagetransitions': 'https://github.com/Telerik-Verified-Plugins/NativePageTransitions/tarball/02f169c45469f4850cf08ace3c895a0f8c12daa0'
});


Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('templating', 'client');
  api.use('jquery', 'client');


  //Other packages use
  api.use('gwendall:body-events@0.1.6', 'client');

  api.mainModule('native-transition.js', 'client');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('jamielob:native-transition');
//   api.mainModule('native-transition-tests.js');
// });
