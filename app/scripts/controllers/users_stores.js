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
