function listRegionsCtrl($scope, DTOptionsBuilder, _regions, _isAuth, $location, $localStorage){
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

  this.goToEdit = function(id){
    console.log('id', id);
    $location.path('settings/edit_region/'+id);
  }

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });

  _regions().then(function(regions){
    console.log(regions);
    self.regions = regions;
  });

}

listRegionsCtrl.resolve = {
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
  _regions: function(RegionsServices){
    return RegionsServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth;
  }
}

function addRegionCtrl($scope, _createRegion, Upload, $window, $location, _isManager, $localStorage) {
  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
    }
  });

  this.goBack = function(){
    $location.path("displays/list_regions");
  }

  this.save = function(){
   _createRegion(self.param).then(function(success){
    if (success.status == 200){
      $location.path("settings/list_regions");
    }
    else{
      console.log(success.status);
    }
  });
 }
}

addRegionCtrl.resolve = {
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
  _createRegion: function(RegionsServices){
    return RegionsServices.create;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

function editRegionCtrl($scope, _editRegion, _getRegion, Upload, $window, _isManager, $location, $localStorage, $stateParams) {
  var self = this;
  this.param = {};

  this.goBack = function(){
    $location.path("settings/list_regions");
  }

  var id = $stateParams.id;
  var self = this;

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getRegion(id).then(function(data){
        self.param = data;
        console.log(self.param);
      });
    }
  });


  this.save = function(){
    console.log('self param --> ', self.param);
    _editRegion(self.param).then(function(success){
      if (success.status == 200){
        $location.path("settings/list_regions");
      }
      else{
        console.log(success.status);
      }
    });

  }
}

editRegionCtrl.resolve = {
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
  _getRegion: function(RegionsServices){
    return RegionsServices.get;
  },
  _editRegion: function(RegionsServices){
    return RegionsServices.edit;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

angular
.module('inspinia')
.controller('listRegionsCtrl', listRegionsCtrl)
.controller('addRegionCtrl', addRegionCtrl)
.controller('editRegionCtrl', editRegionCtrl)
