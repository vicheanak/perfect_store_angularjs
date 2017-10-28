function listManagersCtrl($scope,DTOptionsBuilder, _managers, _isManager, $location, $localStorage){
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
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _managers().then(function(managers){
        console.log(managers);
        self.managers = managers;
      });
    }
  });

  this.showEdit = function(managerId){
    $location.path('users/edit_manager/'+managerId);
  }

}

listManagersCtrl.resolve = {
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
  _managers: function(UsersServices){
    return UsersServices.allManagers;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager
  }
}

function addManagerCtrl($scope, _createManager, Upload, $window, $location, $localStorage, _isManager) {
  var self = this;
  this.param = {};
  this.param.status = true

  this.goBack = function(){
    $location.path('users/list_managers');
  }

  var self = this;

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
  });


  this.save = function(){
    console.log('self param ', self.param);
    _createManager(self.param).then(function(success){
      if (success.status == 200){
        $location.path("users/list_managers");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addManagerCtrl.resolve = {
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
  _createManager: function(UsersServices){
    return UsersServices.createManager;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

function editManagerCtrl($scope, _editManager, _getManager, Upload, $window, $stateParams, _isManager, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";

  var self = this;
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getManager(id).then(function(data){
        console.log(data);
        self.param = data;
      });
    }
  });


  this.goBack = function(){
    $location.path("users/list_managers");
  }

  this.save = function(){
    console.log('param', this.param);
    _editManager(this.param).then(function(success){
      if (success.status == 200){
        $location.path("users/list_managers");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editManagerCtrl.resolve = {
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
  _editManager: function(UsersServices){
    return UsersServices.editManager;
  },
  _getManager: function(UsersServices){
    return UsersServices.getManager;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}


angular
.module('inspinia')
.controller('listManagersCtrl', listManagersCtrl)
.controller('addManagerCtrl', addManagerCtrl)
.controller('editManagerCtrl', editManagerCtrl)
.controller('listViewersCtrl', listViewersCtrl)
.controller('addViewerCtrl', addViewerCtrl)
.controller('editViewerCtrl', editViewerCtrl)
.controller('usersCtrl', usersCtrl)
