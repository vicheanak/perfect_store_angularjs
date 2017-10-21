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
