(function(global) {
    // map tells the System loader where to look for things
    var map = {
      'main': 'dist/main.js',
      'share': 'dist/share',
      'care': 'dist/care', // 'dist',
      'billing': 'dist/billing',
      '@angular': 'node_modules/@angular',
      'rxjs': 'node_modules/rxjs',
      'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
      'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
    };
    var meta = {
      '@angular/*': {
        build: false
      }
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
      // 'main.js':                       { defaultExtension: 'js' },               
      'care': { 
        defaultExtension: 'js',
        meta: {
          'billing/*': {
            build: false
          }
        }
      },
      'billing': { 
        defaultExtension: 'js'
      },
      'share': {
        defaultExtension: 'js'
      },
      'rxjs': { defaultExtension: 'js' }
    };
    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'router-deprecated',
      'upgrade',
    ];
    var care_bundle = ['main','care','care/care.module.js'];
    var billing_bundle = ['billing','billing/billing.module.js'];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
      packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
      packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
       baseURL: "/",
      map: map,
      meta: meta,
      packages: packages,
      bundles:{
        './care/care-bundle.js': care_bundle,
        './billing/billing-bundle.js': billing_bundle
      },
      transpiler: 'plugin-babel'
    };
    System.config(config);
  })(this);