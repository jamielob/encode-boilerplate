Package.describe({
  name: 'jamielob:scroll-history',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Remember the scroll history on pages',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('jquery', 'client');

  api.mainModule('scroll-history.js', 'client');

  //Export
  api.export('scrollHistory');

});
