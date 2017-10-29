/**
 * INSPINIA - Responsive Admin Theme
 *
 */
 (function () {
  angular.module('inspinia', [
      'ui.router',                    // Routing
      'oc.lazyLoad',                  // ocLazyLoad
      'ui.bootstrap',                 // Bootstrap
      'ngSanitize',                   // ngSanitize
      'file-model',                   //File Model
      'ngFileUpload',
      'ngStorage'
      ]).run(function($rootScope, $location) {
        $rootScope.location = $location;
      });
    })();
