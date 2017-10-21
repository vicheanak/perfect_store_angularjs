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
