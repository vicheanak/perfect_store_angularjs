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
      });
    }
  });


  this.edit = function(displayId){
    $location.path('displays/displays/'+displayId);
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

function editDisplayCtrl($scope, _editDisplay, _getStore, _storeTypes, _displayTypes, Upload, $window, _isAdmin, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";

  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _displayTypes().then(function(displayTypes){
        self.displayTypes = displayTypes;
      });

      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes
      });

      _getDisplays().then(function(displays){
        self.displays = displays;
      });
    }
  });


  this.goBack = function(){
    $location.path("stores/list_store_types");
  }

  this.save = function(){
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
