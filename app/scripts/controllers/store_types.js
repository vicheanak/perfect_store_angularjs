function listStoreTypesCtrl($scope,DTOptionsBuilder, _storeTypes, $location, _isAuth, $localStorage){
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
      _storeTypes().then(function(records){
        self.storeTypes = records;
        console.log(self.storeTypes);
      });
    }
  });



  this.showEdit = function(id){
    $location.path("stores/edit_store_type/"+id);
  }

}

listStoreTypesCtrl.resolve = {
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
  _storeTypes: function(StoreTypesServices){
    return StoreTypesServices.all;
  },
}

function addStoreTypeCtrl($scope, _createStoreType, $window, $location, _isAdmin, $localStorage) {
  var self = this;
  this.param = {};
  this.param.status = false;

  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });


  this.save = function(){
    _createStoreType(self.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_store_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addStoreTypeCtrl.resolve = {
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
  _createStoreType: function(StoreTypesServices){
    return StoreTypesServices.create;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin

  }
}

function editStoreTypeCtrl($scope, $stateParams, _editStoreType, _getStoreType, $window, $location, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};

  var id = $stateParams.id;


  this.goBack = function(){
    $location.path("stores/list_store_types");
  }


  $scope.token = $localStorage.token || "";
  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getStoreType(id).then(function(data){
        self.param = data;
        self.storeTypeId = 1;
      });
    }
  });


  this.save = function(){
    _editStoreType(this.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_store_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

editStoreTypeCtrl.resolve = {
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
  _editStoreType: function(StoreTypesServices){
    return StoreTypesServices.edit;
  },
  _getStoreType: function(StoreTypesServices){
    return StoreTypesServices.get;
  },
  _isAdmin: function(UsersServices){
    return UsersServices.isAdmin
  }
}

angular
  .module('inspinia')
  .controller('listStoreTypesCtrl', listStoreTypesCtrl)
  .controller('addStoreTypeCtrl', addStoreTypeCtrl)
  .controller('editStoreTypeCtrl', editStoreTypeCtrl)
