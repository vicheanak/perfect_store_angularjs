function listRegionalsCtrl($scope,DTOptionsBuilder, _regionals, _isManager, $location, $localStorage){
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
      _regionals().then(function(regionals){
        console.log(regionals);
        self.regionals = regionals;
      });
    }
  });

  this.showEdit = function(regionalId){
    $location.path('regionals/edit_regional/'+regionalId);
  }

}

listRegionalsCtrl.resolve = {
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
  _regionals: function(UsersServices){
    return UsersServices.allRegionals;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager
  }
}

function addRegionalCtrl($scope, _createRegional, _regions, Upload, $window, $location, $localStorage, _isManager) {
  var self = this;
  this.param = {};
  this.param.status = true

  this.goBack = function(){
    $location.path('regionals/list_regionals');
  }

  var self = this;

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
  });

  _regions().then(function(regions){
    self.regions = regions;
  });


  this.save = function(){
    console.log('self param ', self.param);
    _createRegional(self.param).then(function(success){
      if (success.status == 200){
        $location.path("regionals/list_regionals");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addRegionalCtrl.resolve = {
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
  _createRegional: function(UsersServices){
    return UsersServices.createRegional;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  },
  _regions: function(RegionsServices){
    return RegionsServices.all;
  }
}

function editRegionalCtrl($scope, _editRegional, _getRegional, _regions, Upload, $window, $stateParams, _isManager, $localStorage, $location) {
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
      _getRegional(id).then(function(data){
        console.log(data);
        self.param = data;
        self.param.regionId = self.param.regionIdUsers;
      });
    }
  });

  _regions().then(function(regions){
    self.regions = regions;
  });

  this.goBack = function(){
    $location.path("regionals/list_regionals");
  }

  this.save = function(){
    console.log('param', this.param);
    _editRegional(this.param).then(function(success){
      if (success.status == 200){
        $location.path("regionals/list_regionals");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editRegionalCtrl.resolve = {
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
  _editRegional: function(UsersServices){
    return UsersServices.editRegional;
  },
  _getRegional: function(UsersServices){
    return UsersServices.getRegional;
  },
  _regions: function(RegionsServices){
    return RegionsServices.all;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

function usersCtrl($scope, $location, UsersServices, $localStorage, UsersServices) {
  var self = this;
  this.param = {};
  this.isManager = false;
  this.isRegional = false;
  this.adminUsername = '';
  this.regionalUsername = '';


  $scope.token = $localStorage.token || "";
  UsersServices.isManager($scope.token).then(function(respond){
    if (respond){
      self.username = respond.fullname;
      self.isManager = true;
    }
  });

  UsersServices.isRegional($scope.token).then(function(respond){
    if (respond){
      self.username = respond.fullname;
      self.isRegional = true;
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
.controller('listManagersCtrl', listManagersCtrl)
.controller('addManagerCtrl', addManagerCtrl)
.controller('editManagerCtrl', editManagerCtrl)
.controller('listRegionalsCtrl', listRegionalsCtrl)
.controller('addRegionalCtrl', addRegionalCtrl)
.controller('editRegionalCtrl', editRegionalCtrl)
.controller('usersCtrl', usersCtrl)
