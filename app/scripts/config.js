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
