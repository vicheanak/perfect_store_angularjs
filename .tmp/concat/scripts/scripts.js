/**
 * INSPINIA - Responsive Admin Theme
 * 2.7.1
 *
 * Custom scripts
 */

$(document).ready(function () {


    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeight = $('nav.navbar-default').height();
        var wrapperHeight = $('#page-wrapper').height();

        if(navbarHeight > wrapperHeight){
            $('#page-wrapper').css("min-height", navbarHeight + "px");
        }

        if(navbarHeight < wrapperHeight){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeight > wrapperHeight) {
                $('#page-wrapper').css("min-height", navbarHeight + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }

    }

    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    setTimeout(function(){
        fix_height();
    });

});


// Minimalize menu when screen is less than 768px
$(window).bind("load resize", function () {
    if ($(document).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

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
    ])
})();

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
  $urlRouterProvider.otherwise("/login");

  $stateProvider

    .state('index', {
      abstract: true,
      url: "/index",
      templateUrl: "views/common/content.html",
    })

    .state('index.main', {
      url: "/main",
      templateUrl: "views/main.html",
      data: { pageTitle: 'Example view' }
    })

    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      data: { pageTitle: 'Login' },
      controller: 'loginCtrl as loginCtrl',
      resolve: loginCtrl.resolve
    })

    .state('displays', {
      abstract: true,
      url: "/displays",
      templateUrl: "views/common/content.html"
    })

    //Displays
    .state('displays.list_displays', {
      url: "/list_displays",
      templateUrl: "views/displays/list_displays.html",
      data: {
        pageTitle: 'Displays'
      },
      controller: 'listDisplaysCtrl as listDisplaysCtrl',
      resolve: listDisplaysCtrl.resolve
    })

    .state('displays.add_display', {
      url: "/add_display",
      templateUrl: "views/displays/add_display.html",
      data: {
        pageTitle: 'Add Display'
      },
      controller: 'addDisplayCtrl as addDisplayCtrl',
      resolve: addDisplayCtrl.resolve
    })

    .state('displays.edit_displays', {
      url: "/edit_display/:id",
      templateUrl: "views/displays/edit_display.html",
      data: {
        pageTitle: 'Edit Display'
      },
      controller: 'editDisplayCtrl as editDisplayCtrl',
      resolve: editDisplayCtrl.resolve
    })

    //Display Types
    .state('displays.list_display_types', {
      url: "/list_display_types",
      templateUrl: "views/display_types/list_display_types.html",
      data: {
        pageTitle: 'Display Types'
      },
      controller: 'listDisplayTypesCtrl as listDisplayTypesCtrl',
      resolve: listDisplayTypesCtrl.resolve
    })
    .state('displays.add_display_type', {
      url: "/add_display_type",
      templateUrl: "views/display_types/add_display_type.html",
      data: {
        pageTitle: 'Add Display Type'
      },
      controller: 'addDisplayTypeCtrl as addDisplayTypeCtrl',
      resolve: addDisplayTypeCtrl.resolve
    })
    .state('displays.edit_display_type', {
      url: "/edit_display_type/:id",
      templateUrl: "views/display_types/edit_display_type.html",
      data: {
        pageTitle: 'Edit Display Type'
      },
      controller: 'editDisplayTypeCtrl as editDisplayTypeCtrl',
      resolve: editDisplayTypeCtrl.resolve
    })
    //Rewards
    .state('displays.list_rewards', {
      url: "/list_rewards",
      templateUrl: "views/rewards/list_rewards.html",
      data: {
        pageTitle: 'Rewards'
      },
      controller: 'listRewardsCtrl as listRewardsCtrl',
      resolve: listRewardsCtrl.resolve
    })
    .state('displays.add_reward', {
      url: "/add_reward",
      templateUrl: "views/rewards/add_reward.html",
      data: {
        pageTitle: 'Add Reward'
      },
      controller: 'addRewardCtrl as addRewardCtrl',
      resolve: addRewardCtrl.resolve
    })
    .state('displays.edit_reward', {
      url: "/edit_reward/:id",
      templateUrl: "views/rewards/edit_reward.html",
      data: {
        pageTitle: 'Edit Reward'
      },
      controller: 'editRewardCtrl as editRewardCtrl',
      resolve: editRewardCtrl.resolve
    })
    .state('stores', {
      abstract: true,
      url: "/stores",
      templateUrl: "views/common/content.html",
    })
    //Store Rewards
    .state('stores.stores_rewards', {
      url: "/stores_rewards",
      templateUrl: "views/stores_rewards/list_stores_rewards.html",
      data: {
        pageTitle: 'Store Claimed'
      },
      controller: 'listStoresRewardsCtrl as listStoresRewardsCtrl',
      resolve: listStoresRewardsCtrl.resolve
    })
    //Stores
    .state('stores.list_stores', {
      url: "/list_stores",
      templateUrl: "views/stores/list_stores.html",
      data: {
        pageTitle: 'Stores'
      },
      controller: 'listStoresCtrl as listStoresCtrl',
      resolve: listStoresCtrl.resolve
    })
    .state('stores.add_store', {
      url: "/add_store",
      templateUrl: "views/stores/add_store.html",
      data: {
        pageTitle: 'Add Store'
      },
      controller: 'addStoreCtrl as addStoreCtrl',
      resolve: addStoreCtrl.resolve
    })
    .state('stores.edit_store', {
      url: "/edit_store/:id",
      templateUrl: "views/stores/edit_store.html",
      data: {
        pageTitle: 'Edit Store'
      },
      controller: 'editStoreCtrl as editStoreCtrl',
      resolve: editStoreCtrl.resolve
    })
    //Store Types
    .state('stores.list_store_types', {
      url: "/list_store_types",
      templateUrl: "views/store_types/list_store_types.html",
      data: {
        pageTitle: 'Store Types'
      },
      controller: 'listStoreTypesCtrl as listStoreTypesCtrl',
      resolve: listStoreTypesCtrl.resolve
    })
    .state('stores.add_store_type', {
      url: "/add_store_type",
      templateUrl: "views/store_types/add_store_type.html",
      data: {
        pageTitle: 'Add Store Type'
      },
      controller: 'addStoreTypeCtrl as addStoreTypeCtrl',
      resolve: addStoreTypeCtrl.resolve
    })
    .state('stores.edit_store_type', {
      url: "/edit_store_type/:id",
      templateUrl: "views/store_types/edit_store_type.html",
      data: {
        pageTitle: 'Edit Store Type'
      },
      controller: 'editStoreTypeCtrl as editStoreTypeCtrl',
      resolve: editStoreTypeCtrl.resolve
    })
    .state('users', {
      abstract: true,
      url: "/users",
      templateUrl: "views/common/content.html"
    })
    //Admin
    .state('users.list_admins', {
      url: "/list_admins",
      templateUrl: "views/users/list_admins.html",
      data: {
        pageTitle: 'Admins'
      },
      controller: 'listAdminsCtrl as listAdminsCtrl',
      resolve: listAdminsCtrl.resolve
    })
    .state('users.add_admin', {
      url: "/add_admin",
      templateUrl: "views/users/add_admin.html",
      data: {
        pageTitle: 'Add Admin'
      },
      controller: 'addAdminCtrl as addAdminCtrl',
      resolve: addAdminCtrl.resolve
    })
    .state('users.edit_admin', {
      url: "/edit_admin/:id",
      templateUrl: "views/users/edit_admin.html",
      data: {
        pageTitle: 'Edit Admin'
      },
      controller: 'editAdminCtrl as editAdminCtrl',
      resolve: editAdminCtrl.resolve
    })
    //Viewers
    .state('users.list_viewers', {
      url: "/list_viewers",
      templateUrl: "views/users/list_viewers.html",
      data: {
        pageTitle: 'Viewers'
      },
      controller: 'listViewersCtrl as listViewersCtrl',
      resolve: listViewersCtrl.resolve
    })
    .state('users.add_viewer', {
      url: "/add_viewer",
      templateUrl: "views/users/add_viewer.html",
      data: {
        pageTitle: 'Add Viewer'
      },
      controller: 'addViewerCtrl as addViewerCtrl',
      resolve: addViewerCtrl.resolve
    })
    .state('users.edit_viewer', {
      url: "/edit_viewer/:id",
      templateUrl: "views/users/edit_viewer.html",
      data: {
        pageTitle: 'Edit Viewer'
      },
      controller: 'editViewerCtrl as editViewerCtrl',
      resolve: editViewerCtrl.resolve
    })
    .state('auditors', {
      abstract: true,
      url: "/auditors",
      templateUrl: "views/common/content.html"
    })
    //Auditors
    .state('auditors.list_auditors', {
      url: "/list_auditors",
      templateUrl: "views/auditors/list_auditors.html",
      data: {
        pageTitle: 'Auditors'
      },
      controller: 'listAuditorsCtrl as listAuditorsCtrl',
      resolve: listAuditorsCtrl.resolve
    })
    .state('auditors.add_auditor', {
      url: "/add_auditor",
      templateUrl: "views/auditors/add_auditor.html",
      data: {
        pageTitle: 'Add Auditor'
      },
      controller: 'addAuditorCtrl as addAuditorCtrl',
      resolve: addAuditorCtrl.resolve
    })
    .state('auditors.edit_auditor', {
      url: "/edit_auditor/:id",
      templateUrl: "views/auditors/edit_auditor.html",
      data: {
        pageTitle: 'Edit Auditor'
      },
      controller: 'editAuditorCtrl as editAuditorCtrl',
      resolve: editAuditorCtrl.resolve
    })
}
angular
  .module('inspinia')
  .config(config)
  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });

function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Perfect Stores';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Perfect Store | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();

            });

            // Colapse menu in mobile mode after click on element
            var menuElement = $('#side-menu a:not([href$="\\#"])');
            menuElement.click(function(){
                if ($(window).width() < 769) {
                    $("body").toggleClass("mini-navbar");
                }
            });

            // Enable initial fixed sidebar
            if ($("body").hasClass('fixed-sidebar')) {
                var sidebar = element.parent();
                sidebar.slimScroll({
                    height: '100%',
                    railOpacity: 0.9
                });
            }
        }
    };
};

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}



/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen);

function HostServices() {
  //var hostName = 'https://api.unilever.store';
  var hostName = 'http://localhost:3000';
  return {
    name: hostName,
  };
}
angular
  .module('inspinia')
  .factory('HostServices', HostServices);

function DisplayTypesServices($http, HostServices) {

  var url = HostServices.name + '/display_types/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    return $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    var editDisplayTypeUrl = url + param.id;
    return $http({
      url: editDisplayTypeUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('DisplayTypesServices', DisplayTypesServices);

function DisplaysServices($http, HostServices) {

  var url = HostServices.name + '/displays/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    console.log('parapms sssssss ', param);
    var data = param;
    return $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    var editUrl = url + param.id
    return $http({
      url: editUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };


  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('DisplaysServices', DisplaysServices);

function RewardsServices($http, HostServices) {

  var url = HostServices.name + '/rewards/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    return $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    var editurl = url + param.id;
    return $http({
      url: editurl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('RewardsServices', RewardsServices);


function StorePointsServices($http, HostServices) {

  var url = HostServices.name + '/store_points/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('StorePointsServices', StorePointsServices);


function StoreTypesServices($http, HostServices) {

  var url = HostServices.name + '/store_types/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    return $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        return success;
      },
      function(error){
        return error;
      }
    );
  };

  function edit (param) {
    var urlId = url + param.id;
    var data = param;
    return $http({
      url: urlId,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        return success;
      },
      function(error){
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });

  };

  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('StoreTypesServices', StoreTypesServices);


function StoresServices($http, HostServices) {

  var url = HostServices.name + '/stores/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    return $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    var editUrl = url + param.id;
    return $http({
      url: editUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('StoresServices', StoresServices);


function StoresRewardsServices($http, HostServices) {

  var url = HostServices.name + '/stores_rewards/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };


  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('StoresRewardsServices', StoresRewardsServices);


function UsersServices($http, HostServices) {

  var auditorUrl = HostServices.name + '/auditors/';
  var adminUrl = HostServices.name + '/admins/';
  var viewerUrl = HostServices.name + '/viewers/';
  var url = HostServices.name + '/users/';
  var logoutUrl = HostServices.name + '/logout/';
  var isAuthUrl = HostServices.name + '/is_auth/';
  var isAdminUrl = HostServices.name + '/is_admin/';
  var isViewerUrl = HostServices.name + '/is_viewer/';
  var isAuditorUrl = HostServices.name + '/is_auditor/';
  var authUrl = HostServices.name + '/auth/';

  function allAuditors() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(auditorUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createAuditor(param) {
    var data = param;
    param.role = 3;
    return $http({
      url: auditorUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function editAuditor(param) {
    var data = param;
    var editAuditorUrl = auditorUrl + data.id;
    return $http({
      url: editAuditorUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function getAuditor(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = auditorUrl + id;
    return $http.get(urlId, config).then(function (response) {
      var storeIds = []
      for (var i = 0; i < response.data.USERS_STOREs.length; i ++){
        storeIds.push(response.data.USERS_STOREs[i].storeIdUsersStores);
      }
      response.data.storeIds = storeIds;
      return response.data;
    });
  };


  function allAdmins() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(adminUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createAdmin(param) {
    var data = param;
    param.role = 1;
    return $http({
      url: adminUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function editAdmin(param) {
    var data = param;
    var editAdminUrl = adminUrl + param.id;
    return $http({
      url: editAdminUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function getAdmin(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = adminUrl + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  function allViewers() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(viewerUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createViewer(param) {
    var data = param;
    param.role = 1;
    return $http({
      url: viewerUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function editViewer(param) {
    var data = param;
    var editViewerUrl = viewerUrl + param.id;
    return $http({
      url: editViewerUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function getViewer(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = viewerUrl + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };


  function isAuth(token) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlToken = isAuthUrl + token;
    return $http.get(urlToken, config).then(function (response) {
      return response.data;
    });
  }

  function isAdmin(token) {
    console.log('Service token', token);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlAdminToken = isAdminUrl + token;
    return $http.get(urlAdminToken, config).then(function (response) {
      return response.data;
    });
  }

  function isViewer(token) {
    console.log('lg viewer token', token);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlViewerToken = isViewerUrl + token;
    return $http.get(urlViewerToken, config).then(function (response) {
      return response.data;
    });
  }

  function auth(username, password){
    return $http({
      url: authUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password
      }
    }).then(
    function(success){
      return success.data;
    },
    function(error){
      return error;
    }
    );
  }

  function outAuth(token){
    return $http({
      url: logoutUrl + '?token='+token,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        token: token
      }
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  }

  return {
    allAuditors: allAuditors,
    createAuditor: createAuditor,
    editAuditor: editAuditor,
    getAuditor: getAuditor,
    allAdmins: allAdmins,
    createAdmin: createAdmin,
    editAdmin: editAdmin,
    getAdmin: getAdmin,
    allViewers: allViewers,
    createViewer: createViewer,
    editViewer: editViewer,
    getViewer: getViewer,
    isAuth: isAuth,
    isAdmin: isAdmin,
    isViewer: isViewer,
    auth: auth,
    outAuth: outAuth
  };
}
angular
.module('inspinia')
.factory('UsersServices', UsersServices);


function UsersStoresServices($http, HostServices) {

  var url = HostServices.name + '/users_stores';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    return $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  function edit (param) {
    var data = param;
    return $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
      function(success){
        console.log(success);
        return success;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  };

  return {
    all: all,
    create: create,
    edit: edit
  };
}
angular
  .module('inspinia')
  .factory('UsersStoresServices', UsersStoresServices);


function loginCtrl($scope, $location, _isAuth, _auth, $localStorage){

  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || false;

  _isAuth($scope.token).then(function(respond){
    if (respond){
      if (respond.id){
        $location.path('/stores/stores_rewards')
      }
    }
  });

  $scope.$watch('token', function() {
    $localStorage.token = $scope.token;
  });

  this.login = function(){
    this.failedAuthMessage = '';
    _auth(this.username, this.password).then(function(data){
      console.log(data);
      if (data.err){
        self.failedAuthMessage = data.err;
      }
      else{
        $localStorage.token = data.token;
        $location.path('/stores/stores_rewards')
      }
    });
  }

  this.forgetPassword = function(){
    console.log('forget password');
  }

}

loginCtrl.resolve = {
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth; 
  },
  _auth: function(UsersServices) {
    return UsersServices.auth; 
  },
  _outAuth: function(UsersServices){
    return UsersServices.outAuth;
  }
}


angular
  .module('inspinia')
  .controller('loginCtrl', loginCtrl)

function listDisplayTypesCtrl($scope,DTOptionsBuilder,_displayTypes, _isAuth, $localStorage, $location){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
      {extend: 'copy'},
      {extend: 'csv'},
      {extend: 'excel', title: 'ExampleFile'},
      {extend: 'pdf', title: 'ExampleFile'},

      {extend: 'print',
        customize: function (win){
          $(win.document.body).addClass('white-bg');
          $(win.document.body).css('font-size', '10px');
          $(win.document.body).find('table')
            .addClass('compact')
            .css('font-size', 'inherit');
        }
      }
    ]);

  var self = this;

  $scope.token = $localStorage.token || "";

  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _displayTypes().then(function(records){
        self.displayTypes = records;
      });
    }
  });

  this.showEdit = function(id){
    $location.path("displays/edit_display_type/"+id);
  }

}

listDisplayTypesCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _displayTypes: function(DisplayTypesServices){
    return DisplayTypesServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

function addDisplayTypeCtrl($scope, _createDisplayType, $window, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  this.param.status = false;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });

  this.save = function(){
    _createDisplayType(self.param).then(function(success){
      if (success.status == 200){
        $location.path("displays/list_display_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addDisplayTypeCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createDisplayType: function(DisplayTypesServices){
    return DisplayTypesServices.create;
  },
  _isAdmin: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

function editDisplayTypeCtrl($scope, _editDisplayType, Upload, $window, $stateParams, $location, _getDisplayType, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};

  var id = $stateParams.id;

  $scope.token = $localStorage.token;
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getDisplayType(id).then(function(data){
        self.param = data;
      });
    }
  });



  this.goBack = function(){
    $location.path("displays/list_display_types");
  }

  this.save = function(){
    _editDisplayType(this.param).then(function(success){
      if (success.status == 200){
        $location.path("displays/list_display_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

editDisplayTypeCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editDisplayType: function(DisplayTypesServices){
    return DisplayTypesServices.edit;
  },
  _getDisplayType: function(DisplayTypesServices){
    return DisplayTypesServices.get;
  },
  _isAdmin: function(UsersServices) {
    return UsersServices.isAuth;
  }
}

angular
  .module('inspinia')
  .controller('listDisplayTypesCtrl', listDisplayTypesCtrl)
  .controller('addDisplayTypeCtrl', addDisplayTypeCtrl)
  .controller('editDisplayTypeCtrl', editDisplayTypeCtrl)

function listDisplaysCtrl($scope,DTOptionsBuilder, _displays, _displayTypes, _storeTypes, $location, _isAuth, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  var self = this;

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes;
      });

      _displayTypes().then(function(displayTypes){
        self.displayTypes = displayTypes;
      });

      _displays().then(function(displays){
        self.displays = displays;
        console.log(self.displays);
      });
    }
  });


  this.showEdit = function(displayId){
    $location.path('displays/edit_display/'+displayId);
  }
}

listDisplaysCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _displays: function(DisplaysServices){
    return DisplaysServices.all;
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _displayTypes: function(DisplayTypesServices){
    return DisplayTypesServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

function addDisplayCtrl($scope, _createDisplay, _storeTypes, _displayTypes, Upload, $window, $localStorage, $location, _isAdmin) {
  var self = this;
  this.param = {};

  this.goBack = function(){
    $location.path("displays/list_displays");
  }

  $scope.token = $localStorage.token || "";

  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes.records;
      });

      _displayTypes().then(function(displayTypes){
        self.displayTypes = displayTypes.records;
      });
    }
  });


  this.save = function(){
    console.log('save --> ', self.param);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createDisplay(self.param).then(function(success){
        if (success.status == 200){
          $location.path("displays/list_displays");
        }
        else{
          console.log(success.status);
        }
      });
    };
  }
}

addDisplayCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createDisplay: function(DisplaysServices){
    return DisplaysServices.create;
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _displayTypes: function(DisplayTypesServices){
    return DisplayTypesServices.all;
  },
  _isAdmin: function(UsersServices) {
    return UsersServices.isAdmin;
  },
}

function editDisplayCtrl($scope, _editDisplay, _getDisplay, _storeTypes, _displayTypes, Upload, $window, _isAuth, $localStorage, $location, $stateParams) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";



  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
     _storeTypes().then(function(storeTypes){
      self.storeTypes = storeTypes.records;
    });

     _displayTypes().then(function(displayTypes){
      self.displayTypes = displayTypes.records;
    });

     _getDisplay(id).then(function(display){
      self.param = display;
      self.param.storeTypeId = self.param.storeTypeIdDisplays;
      self.param.displayTypeId = self.param.displayTypeIdDisplays;
    });
   }
 });


  this.goBack = function(){
    $location.path("stores/list_displays");
  }

  this.save = function(){
    if (self.file){
      var fileReader = new FileReader();
      fileReader.readAsDataURL(self.file);
      fileReader.onload = function (e) {
        var dataUrl = e.target.result;
        var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        self.param.imageUrl = base64Data;
        _editDisplay(self.param).then(function(success){
          if (success.status == 200){
            $location.path("displays/list_displays");
          }
          else{
            console.log(success.status);
          }
        });
      };
    }
    else{
      _editDisplay(self.param).then(function(success){
        if (success.status == 200){
          $location.path("displays/list_displays");
        }
        else{
          console.log(success.status);
        }
      });
    }
  }
}

editDisplayCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editDisplay: function(DisplaysServices){
    return DisplaysServices.edit;
  },
  _getDisplay: function(DisplaysServices){
    return DisplaysServices.get;
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _displayTypes: function(DisplayTypesServices){
    return DisplayTypesServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

angular
.module('inspinia')
.controller('listDisplaysCtrl', listDisplaysCtrl)
.controller('addDisplayCtrl', addDisplayCtrl)
.controller('editDisplayCtrl', editDisplayCtrl)

function listRewardsCtrl($scope, DTOptionsBuilder, _rewards, _isAuth, $location, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  var self = this;

  this.goToEdit = function(id){
    $location.path('displays/edit_reward/'+id);
  }

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });

  _rewards().then(function(rewards){
    self.rewards = rewards;
  });

}

listRewardsCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _rewards: function(RewardsServices){
    return RewardsServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth;
  }
}

function addRewardCtrl($scope, _createReward, Upload, $window, $location, _isAdmin, $localStorage) {
  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
    }
  });

  this.goBack = function(){
    $location.path("displays/list_rewards");
  }

  this.save = function(){
    console.log(self.file);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createReward(self.param).then(function(success){
        if (success.status == 200){
          $location.path("displays/list_rewards");
        }
        else{
          console.log(success.status);
        }
      });
    };
  }
}

addRewardCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createReward: function(RewardsServices){
    return RewardsServices.create;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

function editRewardCtrl($scope, _editReward, _getReward, Upload, $window, _isAdmin, $location, $localStorage, $stateParams) {
  var self = this;
  this.param = {};


  this.goBack = function(){
    $location.path("rewards/list_rewards");
  }

  var id = $stateParams.id;
  var self = this;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getReward(id).then(function(data){
        self.param = data;
        console.log(self.param);
      });
    }
  });


  this.save = function(){
    console.log('self param --> ', self.param);
    if (self.file){
      var fileReader = new FileReader();
      fileReader.readAsDataURL(self.file);
      fileReader.onload = function (e) {
        var dataUrl = e.target.result;
        var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        self.param.imageUrl = base64Data;
        _editReward(self.param).then(function(success){
          if (success.status == 200){
            $location.path("displays/list_rewards");
          }
          else{
            console.log(success.status);
          }
        });
      };
    }
    else{
      _editReward(self.param).then(function(success){
        if (success.status == 200){
          $location.path("displays/list_rewards");
        }
        else{
          console.log(success.status);
        }
      });
    }

  }
}

editRewardCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _getReward: function(RewardsServices){
    return RewardsServices.get;
  },
  _editReward: function(RewardsServices){
    return RewardsServices.edit;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

angular
.module('inspinia')
.controller('listRewardsCtrl', listRewardsCtrl)
.controller('addRewardCtrl', addRewardCtrl)
.controller('editRewardCtrl', editRewardCtrl)

function listStorePointsCtrl($scope,DTOptionsBuilder, _storePoints){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
      {extend: 'copy'},
      {extend: 'csv'},
      {extend: 'excel', title: 'ExampleFile'},
      {extend: 'pdf', title: 'ExampleFile'},

      {extend: 'print',
        customize: function (win){
          $(win.document.body).addClass('white-bg');
          $(win.document.body).css('font-size', '10px');
          $(win.document.body).find('table')
            .addClass('compact')
            .css('font-size', 'inherit');
        }
      }
    ]);
  this.storePoints = _storePoints
}

listStorePointsCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _storePoints: function(StorePointsServices){
    return StorePointsServices.all();
  },
}

function addStorePointCtrl($scope, _createStorePoint, Upload, $window) {
  var self = this;
  this.param = {};

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createStorePoint(self.param);
    };
  }
}

addStorePointCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createStorePoint: function(StorePointsServices){
    return StorePointsServices.create;
  }
}

function editStorePointCtrl($scope, _editStorePoint, Upload, $window) {
  var self = this;
  this.param = {};

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _editStorePoint(self.param);
    };
  }
}

editStorePointCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editStorePoint: function(StorePointsServices){
    return StorePointsServices.edit;
  }
}

angular
  .module('inspinia')
  .controller('listStorePointsCtrl', listStorePointsCtrl)
  .controller('addStorePointCtrl', addStorePointCtrl)
  .controller('editStorePointCtrl', editStorePointCtrl)

function listStoreTypesCtrl($scope,DTOptionsBuilder, _storeTypes, $location, _isAuth, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
      {extend: 'copy'},
      {extend: 'csv'},
      {extend: 'excel', title: 'ExampleFile'},
      {extend: 'pdf', title: 'ExampleFile'},

      {extend: 'print',
        customize: function (win){
          $(win.document.body).addClass('white-bg');
          $(win.document.body).css('font-size', '10px');
          $(win.document.body).find('table')
            .addClass('compact')
            .css('font-size', 'inherit');
        }
      }
    ]);
  var self = this;

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(records){
        self.storeTypes = records;
        console.log(self.storeTypes);
      });
    }
  });



  this.showEdit = function(id){
    $location.path("stores/edit_store_type/"+id);
  }

}

listStoreTypesCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth;
  }
}

function addStoreTypeCtrl($scope, _createStoreType, $window, $location, _isAdmin, $localStorage) {
  var self = this;
  this.param = {};
  this.param.status = false;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });


  this.save = function(){
    _createStoreType(self.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_store_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addStoreTypeCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createStoreType: function(StoreTypesServices){
    return StoreTypesServices.create;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin

  }
}

function editStoreTypeCtrl($scope, $stateParams, _editStoreType, _getStoreType, $window, $location, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};

  var id = $stateParams.id;


  this.goBack = function(){
    $location.path("stores/list_store_types");
  }


  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getStoreType(id).then(function(data){
        self.param = data;
        self.storeTypeId = 1;
      });
    }
  });


  this.save = function(){
    _editStoreType(this.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_store_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

editStoreTypeCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editStoreType: function(StoreTypesServices){
    return StoreTypesServices.edit;
  },
  _getStoreType: function(StoreTypesServices){
    return StoreTypesServices.get;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin
  }
}

angular
  .module('inspinia')
  .controller('listStoreTypesCtrl', listStoreTypesCtrl)
  .controller('addStoreTypeCtrl', addStoreTypeCtrl)
  .controller('editStoreTypeCtrl', editStoreTypeCtrl)

function listStoresCtrl($scope,DTOptionsBuilder, _stores, _storeTypes, $location, _isAuth, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  var self = this;


  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        for (var i = 0; i < storeTypes.length; i ++){
          if (storeTypes[i].status == true){
            self.storeTypes = storeTypes;
          }
        }
      });

      _stores().then(function(stores){
        self.stores = stores;
      });
    }
  });


  this.edit = function(storeId){
    $location.path('stores/edit_store/'+storeId);
  }
}

listStoresCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _stores: function(StoresServices){
    return StoresServices.all;
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth
  }
}

function addStoreCtrl($scope, _createStore, _storeTypes, Upload, $window, $location, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || "";
  this.param.token = $scope.token;

  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes.records;
        self.param.storeTypeId = 1;
      });
    }
  });

  this.goBack = function(){
    $location.path("stores/list_stores");
  }

  this.save = function(){
    console.log(self.param);
    _createStore(self.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_stores");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

addStoreCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createStore: function(StoresServices){
    return StoresServices.create;
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }

}

function editStoreCtrl($scope, _editStore, _getStore, _storeTypes, Upload, $window, $stateParams, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;


  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes.records;
      });

      _getStore(id).then(function(data){
        self.param = data;
        self.storeTypeId = self.param.storeTypeIdStores;
      });
    }
  });



  this.goBack = function(){
    $location.path("stores/list_stores");
  }

  this.save = function(){
    console.log(this.param);
    _editStore(this.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_stores");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editStoreCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editStore: function(StoresServices){
    return StoresServices.edit;
  },
  _getStore: function(StoresServices){
    return StoresServices.get;
  },
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

angular
.module('inspinia')
.controller('listStoresCtrl', listStoresCtrl)
.controller('addStoreCtrl', addStoreCtrl)
.controller('editStoreCtrl', editStoreCtrl)

function listStoresRewardsCtrl($scope,DTOptionsBuilder, _storesRewards, _isAuth, $localStorage, $location){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  $scope.token = $localStorage.token || "";

  var self = this;
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storesRewards().then(function(storesRewards){
        self.storesRewards = storesRewards;
        console.log('lg ', self.storesRewards);
      });

    }
  });


}

listStoresRewardsCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _storesRewards: function(StoresRewardsServices){
    return StoresRewardsServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

angular
.module('inspinia')
.controller('listStoresRewardsCtrl', listStoresRewardsCtrl)

function listAdminsCtrl($scope,DTOptionsBuilder, _admins, _isAdmin, $location, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  var self = this;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _admins().then(function(admins){
        console.log(admins);
        self.admins = admins;
      });
    }
  });

  this.showEdit = function(adminId){
    $location.path('users/edit_admin/'+adminId);
  }

}

listAdminsCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _admins: function(UsersServices){
    return UsersServices.allAdmins;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin
  }
}

function addAdminCtrl($scope, _createAdmin, Upload, $window, $location, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};
  this.param.status = true

  this.goBack = function(){
    $location.path('users/list_admins');
  }

  var self = this;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
  });


  this.save = function(){
    console.log('self param ', self.param);
    _createAdmin(self.param).then(function(success){
      if (success.status == 200){
        $location.path("users/list_admins");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addAdminCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createAdmin: function(UsersServices){
    return UsersServices.createAdmin;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

function editAdminCtrl($scope, _editAdmin, _getAdmin, Upload, $window, $stateParams, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";

  var self = this;
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getAdmin(id).then(function(data){
        console.log(data);
        self.param = data;
      });
    }
  });


  this.goBack = function(){
    $location.path("users/list_admins");
  }

  this.save = function(){
    console.log('param', this.param);
    _editAdmin(this.param).then(function(success){
      if (success.status == 200){
        $location.path("users/list_admins");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editAdminCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editAdmin: function(UsersServices){
    return UsersServices.editAdmin;
  },
  _getAdmin: function(UsersServices){
    return UsersServices.getAdmin;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}
function listViewersCtrl($scope,DTOptionsBuilder, _viewers, _isAdmin, $location, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  var self = this;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _viewers().then(function(viewers){
        console.log(viewers);
        self.viewers = viewers;
      });
    }
  });

  this.showEdit = function(viewerId){
    $location.path('users/edit_viewer/'+viewerId);
  }

}

listViewersCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _viewers: function(UsersServices){
    return UsersServices.allViewers;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin
  }
}

function addViewerCtrl($scope, _createViewer, Upload, $window, $location, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};
  this.param.status = true

  this.goBack = function(){
    $location.path('users/list_viewers');
  }

  var self = this;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
  });


  this.save = function(){
    console.log('self param ', self.param);
    _createViewer(self.param).then(function(success){
      if (success.status == 200){
        $location.path("users/list_viewers");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addViewerCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createViewer: function(UsersServices){
    return UsersServices.createViewer;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

function editViewerCtrl($scope, _editViewer, _getViewer, Upload, $window, $stateParams, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";

  var self = this;
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getViewer(id).then(function(data){
        console.log(data);
        self.param = data;
      });
    }
  });


  this.goBack = function(){
    $location.path("users/list_viewers");
  }

  this.save = function(){
    console.log('param', this.param);
    _editViewer(this.param).then(function(success){
      if (success.status == 200){
        $location.path("users/list_viewers");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editViewerCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editViewer: function(UsersServices){
    return UsersServices.editViewer;
  },
  _getViewer: function(UsersServices){
    return UsersServices.getViewer;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

function usersCtrl($scope, $location, UsersServices, $localStorage, UsersServices) {
  var self = this;
  this.param = {};
  this.isAdmin = false;
  this.isViewer = false;
  this.adminUsername = '';
  this.viewerUsername = '';


  $scope.token = $localStorage.token || "";
  UsersServices.isAdmin($scope.token).then(function(respond){
    if (respond){
      self.username = respond.fullname;
      self.isAdmin = true;
    }
  });

  UsersServices.isViewer($scope.token).then(function(respond){
    if (respond){
      self.username = respond.fullname;
      self.isViewer = true;
    }
  });

  this.logout = function(){
    var param = {};
    UsersServices.outAuth($localStorage.token).then(function(success){
      if (success.status == 200){
        $localStorage.token = "";
        $location.path("login");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

angular
.module('inspinia')
.controller('listAdminsCtrl', listAdminsCtrl)
.controller('addAdminCtrl', addAdminCtrl)
.controller('editAdminCtrl', editAdminCtrl)
.controller('listViewersCtrl', listViewersCtrl)
.controller('addViewerCtrl', addViewerCtrl)
.controller('editViewerCtrl', editViewerCtrl)
.controller('usersCtrl', usersCtrl)

function listAuditorsCtrl($scope, DTOptionsBuilder, _stores, _auditors, _isAuth, $localStorage, $location){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
  .withDOM('<"html5buttons"B>lTfgitp')
  .withButtons([
    {extend: 'copy'},
    {extend: 'csv'},
    {extend: 'excel', title: 'ExampleFile'},
    {extend: 'pdf', title: 'ExampleFile'},

    {extend: 'print',
    customize: function (win){
      $(win.document.body).addClass('white-bg');
      $(win.document.body).css('font-size', '10px');
      $(win.document.body).find('table')
      .addClass('compact')
      .css('font-size', 'inherit');
    }
  }
  ]);

  var self = this;
  $scope.token = $localStorage.token || "";

  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _auditors().then(function(auditors){
        self.auditors = auditors;
        console.log(self.auditors.records);
      });
      _stores().then(function(stores){
        self.stores = _stores;
      });
    }
  });

  this.showEdit = function(auditorId){
    $location.path('auditors/edit_auditor/'+auditorId);
  }
}

listAuditorsCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _auditors: function(UsersServices){
    return UsersServices.allAuditors;
  },
  _stores: function(StoresServices){
    return StoresServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

function addAuditorCtrl($scope, _createAuditor, _stores, Upload, $window, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  this.param.status = true

  $scope.token = $localStorage.token || "";


  var self = this;
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _stores().then(function(stores){
        self.stores = stores.records;
      });
    }
  });


  this.goBack = function(){
    $location.path("auditors/list_auditors");
  }

  this.save = function(){
    console.log('self param ', self.param);
    _createAuditor(self.param).then(function(success){
      if (success.status == 200){
        $location.path("auditors/list_auditors");
      }
      else{
        console.log(success.status);
      }
    });
  }



}


addAuditorCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    },{
      files: ['js/plugins/moment/moment.min.js']
    }, {
      name: 'ui.knob',
      files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
    }, {
      files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
    }, {
      insertBefore: '#loadBefore',
      name: 'localytics.directives',
      files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
    }, {
      name: 'nouislider',
      files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
    }, {
      name: 'datePicker',
      files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
    }, {
      files: ['js/plugins/jasny/jasny-bootstrap.min.js']
    }, {
      files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
    }, {
      name: 'ui.switchery',
      files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
    }, {
      name: 'colorpicker.module',
      files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
    }, {
      name: 'ngImgCrop',
      files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
    }, {
      serie: true,
      files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
    }, {
      name: 'daterangepicker',
      files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
    }, {
      files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
    }, {
      name: 'ui.select',
      files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
    }, {
      files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
    }, {
      name: 'ngTagsInput',
      files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
    }, {
      files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
    }, {
      name: 'frapontillo.bootstrap-duallistbox',
      files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
    }
    ]);
  },
  _createAuditor: function(UsersServices){
    return UsersServices.createAuditor;
  },
  _stores: function(StoresServices){
    return StoresServices.all;
  },
  _isAdmin: function(UsersServices) {
    return UsersServices.isAdmin;
  },
}

function editAuditorCtrl($scope, _editAuditor, _getAuditor, _stores, Upload, $window, $stateParams, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";

  var self = this;
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _stores().then(function(stores){
        self.stores = stores.records;
      });

      _getAuditor(id).then(function(data){
        console.log(data);
        self.param = data;
      });
    }
  });


  this.goBack = function(){
    $location.path("auditors/list_auditors");
  }

  this.save = function(){
    console.log('param', this.param);
    _editAuditor(this.param).then(function(success){
      if (success.status == 200){
        $location.path("auditors/list_auditors");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editAuditorCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
   return $ocLazyLoad.load([{
    files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
  },{
    files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
  },{
    files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
  },{
    files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
  },{
    files: ['js/plugins/moment/moment.min.js']
  }, {
    name: 'ui.knob',
    files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
  }, {
    files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
  }, {
    insertBefore: '#loadBefore',
    name: 'localytics.directives',
    files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
  }, {
    name: 'nouislider',
    files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
  }, {
    name: 'datePicker',
    files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
  }, {
    files: ['js/plugins/jasny/jasny-bootstrap.min.js']
  }, {
    files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
  }, {
    name: 'ui.switchery',
    files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
  }, {
    name: 'colorpicker.module',
    files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
  }, {
    name: 'ngImgCrop',
    files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
  }, {
    serie: true,
    files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
  }, {
    name: 'daterangepicker',
    files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
  }, {
    files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
  }, {
    name: 'ui.select',
    files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
  }, {
    files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
  }, {
    name: 'ngTagsInput',
    files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
  }, {
    files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
  }, {
    name: 'frapontillo.bootstrap-duallistbox',
    files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
  }
  ]);
 },
 _editAuditor: function(UsersServices){
  return UsersServices.editAuditor;
},
_getAuditor: function(UsersServices){
  return UsersServices.getAuditor;
},
_stores: function(StoresServices){
  return StoresServices.all;
},
_isAdmin: function(UsersServices) {
  return UsersServices.isAuth;
},
}

angular
.module('inspinia')
.controller('listAuditorsCtrl', listAuditorsCtrl)
.controller('addAuditorCtrl', addAuditorCtrl)
.controller('editAuditorCtrl', editAuditorCtrl)

function listUsersStoresCtrl($scope,DTOptionsBuilder, _usersStores, _isAuth, $location, $localStorage){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withDOM('<"html5buttons"B>lTfgitp')
    .withButtons([
      {extend: 'copy'},
      {extend: 'csv'},
      {extend: 'excel', title: 'ExampleFile'},
      {extend: 'pdf', title: 'ExampleFile'},

      {extend: 'print',
        customize: function (win){
          $(win.document.body).addClass('white-bg');
          $(win.document.body).css('font-size', '10px');
          $(win.document.body).find('table')
            .addClass('compact')
            .css('font-size', 'inherit');
        }
      }
    ]);
  var self = this;

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes;
      });

      _displayTypes().then(function(displayTypes){
        self.displayTypes = displayTypes;
      });

      _displays().then(function(displays){
        self.displays = displays;
      });
    }
  });

  this.usersStores = _usersStores;
}

listUsersStoresCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      serie: true,
      files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js', 'css/plugins/blueimp/css/blueimp-gallery.min.css']
    },{
      serie: true,
      files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
    }, {
      serie: true,
      name: 'datatables',
      files: ['js/plugins/dataTables/angular-datatables.min.js']
    }, {
      serie: true,
      name: 'datatables.buttons',
      files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
    }]);
  },
  _usersStores: function(UsersStoresServices){
    return UsersStoresServices.all();
  },
}

function addUsersStoreCtrl($scope, _createUsersStore, Upload, $window, $location, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes;
      });

      _displayTypes().then(function(displayTypes){
        self.displayTypes = displayTypes;
      });

      _displays().then(function(displays){
        self.displays = displays;
      });
    }
  });


  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createUsersStore(self.param);
    };
  }
}

addUsersStoreCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _createUsersStore: function(UsersStoresServices){
    return UsersStoresServices.create;
  }
}

function editUsersStoreCtrl($scope, _editUsersStore, Upload, $window, _isAdmin, $location, $localStorage) {
  var self = this;
  this.param = {};


  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes;
      });

      _displayTypes().then(function(displayTypes){
        self.displayTypes = displayTypes;
      });

      _displays().then(function(displays){
        self.displays = displays;
      });
    }
  });

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createUsersStore(self.param);
    };
  }
}

editUsersStoreCtrl.resolve = {
  loadPlugin: function($ocLazyLoad) {
    return $ocLazyLoad.load([{
      files: ['bower_components/ng-file-upload/FileAPI.min.js','bower_components/ng-file-upload/ng-file-upload.min.js']
    },{
      files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
    },{
      files: ['css/plugins/dropzone/basic.css', 'css/plugins/dropzone/dropzone.css', 'js/plugins/dropzone/dropzone.js']
    },{
      files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
    }, ]);
  },
  _editUsersStore: function(UsersStoresServices){
    return UsersStoresServices.edit;
  },
  _isAdmin: function(UsersStoresServices){
    return UsersStoresServices.isAdmin;
  }
}

angular
  .module('inspinia')
  .controller('listUsersStoresCtrl', listUsersStoresCtrl)
  .controller('addUsersStoreCtrl', addUsersStoreCtrl)
  .controller('editUsersStoreCtrl', editUsersStoreCtrl)
