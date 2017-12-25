(function(global) {
    // map tells the System loader where to look for things
    var map = {
      'main': 'dist/main.js',
      'share': 'dist/share',
      'care': 'dist/care', // 'dist',
      'billing': 'dist/billing',
      '@angular': 'node_modules/@angular',
      '@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.min.js',
      '@angular/animations/browser':'node_modules/@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@swimlane/ngx-charts': 'node_modules/@swimlane/ngx-charts',
      'rxjs': 'node_modules/rxjs',
      'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
      'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
    };
    var meta = {
      '@angular/*': {
        build: false
      },
      '@swimlane/ngx-charts/*': {
        build: false
      },
      'rxjs/*': {
        build: false,
        esModule: true
      },
      'd3': {
        build: false
      },
      'd3-*': {
        build: false
      }
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {             
      'care': { 
        defaultExtension: 'js'
      },
      'billing': { 
        defaultExtension: 'js'
      },
      'share': {
        defaultExtension: 'js'
      },
      '@swimlane/ngx-charts': {
        main: 'release/index.js',
        defaultExtension: 'js'
       },
       'rxjs': {
         defaultExtension: 'js'
       }

    };
    
    var careBundle = ['main','care', 'care/care.module.js'];
    var billingBundle = ['billing','billing/billing.module.js'];

    var bundles = {
      './care/care-bundle.js': careBundle,
      './billing/billing-bundle.js': billingBundle
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
      'upgrade'
    ];
    var d3PackageNames = [
      'd3',
      'd3-array',
      'd3-brush',
      'd3-color',
      'd3-force',
      'd3-format',
      'd3-hierarchy',
      'd3-interpolate',
      'd3-scale',
      'd3-selection',
      'd3-shape',
      'd3-time-format',
    ];
    function packIndex(pkgName) {
      packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    function mapD3(pkgName) {
      map[pkgName] = 'node_modules/d3';
      packages[pkgName] = { main: 'build/d3.js', defaultExtension: 'js' };
    }

    // Individual files (~300 requests):
    function packNgIndex(pkgName) {
      packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packNgUmd(pkgName) {
      packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packNgIndex : packNgUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    d3PackageNames.forEach(packIndex);
    d3PackageNames.forEach(mapD3);
    var config = {
      baseURL: '/',
      map: map,
      meta: meta,
      packages: packages,
      bundles: bundles,
      transpiler: 'plugin-babel'
    };
    System.config(config);
  })(this);