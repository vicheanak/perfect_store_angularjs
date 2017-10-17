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
        self.auditors = _auditors;
      });
      _stores().then(function(stores){
        self.stores = _stores;
      });
    }
  });

  this.edit = function(auditorId){
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
    }, ]);
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
        self.param = data;
      });
    }
  });


  this.goBack = function(){
    $location.path("auditors/list_auditors");
  }

  this.save = function(){
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
    }, ]);
  },
  _editAuditor: function(UsersServices){
    return UsersServices.editAuditor;
  },
  _getAuditor: function(UsersServices){
    return UsersServices.get;
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
