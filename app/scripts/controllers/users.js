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
        this.admins = admins;
      });
    }
  });


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

  this.goBack = function(){
    $location.path('users/list_admins');
  }

  var self = this;

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
    _createAdmin(self.param);
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

function editAdminCtrl($scope, _editAdmin, Upload, $window, $localStorage, $location, _isAdmin) {
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
      _editAdmin(self.param);
    };
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
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

function listViewersCtrl($scope,DTOptionsBuilder, _viewers){
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
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _viewers().then(function(viewers){
        this.viewers = _viewers;
      });
    }
  });

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
    return UsersServices.isAdmin;
  }
}

function addViewerCtrl($scope, _createViewer, Upload, $window, $location, $localStorage, _isAdmin) {
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

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createViewer(self.param);
    };
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
  isAdmin: function(UsersServices){
    return UsersServices.isAdmin;
  }
}

function editViewerCtrl($scope, _editViewer, Upload, $window, $location, _isAdmin, $localStorage) {
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

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _editViewer(self.param);
    };
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
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin
  }
}

function usersCtrl($scope, $location, UsersServices, $localStorage) {
  var self = this;
  this.param = {};

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
