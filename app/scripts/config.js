function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
  $urlRouterProvider.otherwise("/stores/dashboard");

  $stateProvider

  .state('index', {
    abstract: true,
    url: "/index",
    templateUrl: "views/common/content.html",
  })

  // .state('index.main', {
  //   url: "/main",
  //   templateUrl: "views/dashboard.html",
  //   data: { pageTitle: 'Example view' }
  // })

  .state('login', {
    url: "/login",
    templateUrl: "views/login.html",
    data: { pageTitle: 'Login' },
    controller: 'loginCtrl as loginCtrl',
    resolve: loginCtrl.resolve
  })


  .state('stores.dashboard', {
    url: "/dashboard",
    templateUrl: "views/dashboard.html",
    data: {
      pageTitle: 'Dashboard'
    },
    controller: 'dashboardCtrl as dashboardCtrl',
    resolve: dashboardCtrl.resolve
  })


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



  .state('displays', {
    abstract: true,
    url: "/displays",
    templateUrl: "views/common/content.html"
  })


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
  .state('displays.list_conditions', {
    url: "/list_conditions",
    templateUrl: "views/conditions/list_conditions.html",
    data: {
      pageTitle: 'Conditions'
    },
    controller: 'listConditionsCtrl as listConditionsCtrl',
    resolve: listConditionsCtrl.resolve
  })

  .state('displays.add_condition', {
    url: "/add_condition",
    templateUrl: "views/conditions/add_condition.html",
    data: {
      pageTitle: 'Add Condition'
    },
    controller: 'addConditionCtrl as addConditionCtrl',
    resolve: addConditionCtrl.resolve
  })

  .state('displays.edit_condition', {
    url: "/edit_condition/:id",
    templateUrl: "views/conditions/edit_condition.html",
    data: {
      pageTitle: 'Edit Condition'
    },
    controller: 'editConditionCtrl as editConditionCtrl',
    resolve: editConditionCtrl.resolve
  })

  .state('stores.stores_rewards', {
    url: "/stores_rewards",
    templateUrl: "views/stores_rewards/list_stores_rewards.html",
    data: {
      pageTitle: 'Store Claimed'
    },
    controller: 'listStoresRewardsCtrl as listStoresRewardsCtrl',
    resolve: listStoresRewardsCtrl.resolve
  })


  .state('managers', {
    abstract: true,
    url: "/users",
    templateUrl: "views/common/content.html"
  })
  .state('managers.list_managers', {
    url: "/list_managers",
    templateUrl: "views/managers/list_managers.html",
    data: {
      pageTitle: 'Managers'
    },
    controller: 'listManagersCtrl as listManagersCtrl',
    resolve: listManagersCtrl.resolve
  })
  .state('managers.add_manager', {
    url: "/add_manager",
    templateUrl: "views/managers/add_manager.html",
    data: {
      pageTitle: 'Add Manager'
    },
    controller: 'addManagerCtrl as addManagerCtrl',
    resolve: addManagerCtrl.resolve
  })
  .state('managers.edit_manager', {
    url: "/edit_manager/:id",
    templateUrl: "views/managers/edit_manager.html",
    data: {
      pageTitle: 'Edit Manager'
    },
    controller: 'editManagerCtrl as editManagerCtrl',
    resolve: editManagerCtrl.resolve
  })


  .state('regionals', {
    abstract: true,
    url: "/regionals",
    templateUrl: "views/common/content.html"
  })
  .state('regionals.list_regionals', {
    url: "/list_regionals",
    templateUrl: "views/regionals/list_regionals.html",
    data: {
      pageTitle: 'Regionals'
    },
    controller: 'listRegionalsCtrl as listRegionalsCtrl',
    resolve: listRegionalsCtrl.resolve
  })
  .state('regionals.add_regional', {
    url: "/add_regional",
    templateUrl: "views/regionals/add_regional.html",
    data: {
      pageTitle: 'Add Regional'
    },
    controller: 'addRegionalCtrl as addRegionalCtrl',
    resolve: addRegionalCtrl.resolve
  })
  .state('regionals.edit_regional', {
    url: "/edit_regional/:id",
    templateUrl: "views/regionals/edit_regional.html",
    data: {
      pageTitle: 'Edit Regional'
    },
    controller: 'editRegionalCtrl as editRegionalCtrl',
    resolve: editRegionalCtrl.resolve
  })


  .state('auditors', {
    abstract: true,
    url: "/auditors",
    templateUrl: "views/common/content.html"
  })
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


  .state('reports', {
    abstract: true,
    url: "/reports",
    templateUrl: "views/common/content.html"
  })

  .state('reports.claims', {
    url: "/claims",
    templateUrl: "views/reports/claims.html",
    data: {
      pageTitle: 'Claims Report'
    },
    controller: 'claimsReportCtrl as claimsReportCtrl',
    resolve: claimsReportCtrl.resolve
  })


  .state('reports.stores', {
    url: "/stores",
    templateUrl: "views/reports/stores.html",
    data: {
      pageTitle: 'Stores Report'
    },
    controller: 'storesReportCtrl as storesReportCtrl',
    resolve: storesReportCtrl.resolve
  })

  .state('reports.displays', {
    url: "/displays",
    templateUrl: "views/reports/displays.html",
    data: {
      pageTitle: 'Displays Report'
    },
    controller: 'displaysReportCtrl as displaysReportCtrl',
    resolve: displaysReportCtrl.resolve
  })

  .state('reports.auditors', {
    url: "/reports_auditors",
    templateUrl: "views/reports/auditors.html",
    data: {
      pageTitle: 'Auditors Report'
    },
    controller: 'auditorsReportCtrl as auditorsReportCtrl',
    resolve: auditorsReportCtrl.resolve
  })



  .state('settings', {
    abstract: true,
    url: "/settings",
    templateUrl: "views/common/content.html"
  })


  .state('settings.list_display_types', {
    url: "/list_display_types",
    templateUrl: "views/display_types/list_display_types.html",
    data: {
      pageTitle: 'Display Types'
    },
    controller: 'listDisplayTypesCtrl as listDisplayTypesCtrl',
    resolve: listDisplayTypesCtrl.resolve
  })
  .state('settings.add_display_type', {
    url: "/add_display_type",
    templateUrl: "views/display_types/add_display_type.html",
    data: {
      pageTitle: 'Add Display Type'
    },
    controller: 'addDisplayTypeCtrl as addDisplayTypeCtrl',
    resolve: addDisplayTypeCtrl.resolve
  })
  .state('settings.edit_display_type', {
    url: "/edit_display_type/:id",
    templateUrl: "views/display_types/edit_display_type.html",
    data: {
      pageTitle: 'Edit Display Type'
    },
    controller: 'editDisplayTypeCtrl as editDisplayTypeCtrl',
    resolve: editDisplayTypeCtrl.resolve
  })
  .state('settings.list_regions', {
    url: "/list_regions",
    templateUrl: "views/regions/list_regions.html",
    data: {
      pageTitle: 'Regions'
    },
    controller: 'listRegionsCtrl as listRegionsCtrl',
    resolve: listRegionsCtrl.resolve
  })
  .state('settings.add_region', {
    url: "/add_region",
    templateUrl: "views/regions/add_region.html",
    data: {
      pageTitle: 'Add Region'
    },
    controller: 'addRegionCtrl as addRegionCtrl',
    resolve: addRegionCtrl.resolve
  })
  .state('settings.edit_region', {
    url: "/edit_region/:id",
    templateUrl: "views/regions/edit_region.html",
    data: {
      pageTitle: 'Edit Region'
    },
    controller: 'editRegionCtrl as editRegionCtrl',
    resolve: editRegionCtrl.resolve
  })

  .state('settings.list_store_types', {
    url: "/list_store_types",
    templateUrl: "views/store_types/list_store_types.html",
    data: {
      pageTitle: 'Store Types'
    },
    controller: 'listStoreTypesCtrl as listStoreTypesCtrl',
    resolve: listStoreTypesCtrl.resolve
  })
  .state('settings.add_store_type', {
    url: "/add_store_type",
    templateUrl: "views/store_types/add_store_type.html",
    data: {
      pageTitle: 'Add Store Type'
    },
    controller: 'addStoreTypeCtrl as addStoreTypeCtrl',
    resolve: addStoreTypeCtrl.resolve
  })
  .state('settings.edit_store_type', {
    url: "/edit_store_type/:id",
    templateUrl: "views/store_types/edit_store_type.html",
    data: {
      pageTitle: 'Edit Store Type'
    },
    controller: 'editStoreTypeCtrl as editStoreTypeCtrl',
    resolve: editStoreTypeCtrl.resolve
  })
  .state('settings.list_rewards', {
    url: "/list_rewards",
    templateUrl: "views/rewards/list_rewards.html",
    data: {
      pageTitle: 'Rewards'
    },
    controller: 'listRewardsCtrl as listRewardsCtrl',
    resolve: listRewardsCtrl.resolve
  })
  .state('settings.add_reward', {
    url: "/add_reward",
    templateUrl: "views/rewards/add_reward.html",
    data: {
      pageTitle: 'Add Reward'
    },
    controller: 'addRewardCtrl as addRewardCtrl',
    resolve: addRewardCtrl.resolve
  })
  .state('settings.edit_reward', {
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

  .state('issues', {
    abstract: true,
    url: "/issues",
    templateUrl: "views/common/content.html"
  })

  .state('issues.list_issues', {
    url: "/list_issues",
    templateUrl: "views/issues/list_issues.html",
    data: {
      pageTitle: 'Issues'
    },
    controller: 'listIssuesCtrl as listIssuesCtrl',
    resolve: listIssuesCtrl.resolve
  })


  .state('issues.add_issue', {
    url: "/add_issue",
    templateUrl: "views/issues/add_issue.html",
    data: {
      pageTitle: 'Add Issue'
    },
    controller: 'addIssueCtrl as addIssueCtrl',
    resolve: addIssueCtrl.resolve
  })

  .state('issues.edit_issue', {
    url: "/edit_issue/:id",
    templateUrl: "views/issues/edit_issue.html",
    data: {
      pageTitle: 'Edit Issue'
    },
    controller: 'editIssueCtrl as editIssueCtrl',
    resolve: editIssueCtrl.resolve
  })

  .state('issues.detail_issue', {
    url: "/detail_issue/:id",
    templateUrl: "views/issues/detail_issue.html",
    data: {
      pageTitle: 'Detail Issue'
    },
    controller: 'detailIssueCtrl as detailIssueCtrl',
    resolve: detailIssueCtrl.resolve
  })
}
angular
.module('inspinia')
.config(config)
.run(function($rootScope, $state) {
  $rootScope.$state = $state;
});
