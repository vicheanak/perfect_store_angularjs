function listDisplayTypesCtrl($scope,DTOptionsBuilder,_displayTypes, _isAuth, $localStorage, $location){
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
      _displayTypes().then(function(records){
        self.displayTypes = records;
      });
    }
  });

  this.showEdit = function(id){
    $location.path("displays/display_types/"+id);
  }

}

listDisplayTypesCtrl.resolve = {
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
  _displayTypes: function(DisplayTypesServices){
    return DisplayTypesServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth; 
  },
}

function addDisplayTypeCtrl($scope, _createDisplayType, $window, _isAdmin, $localStorage, $location) {
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
    _createDisplayType(self.param).then(function(success){
      if (success.status == 200){
        $location.path("displays/list_display_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

addDisplayTypeCtrl.resolve = {
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
  _createDisplayType: function(DisplayTypesServices){
    return DisplayTypesServices.create;
  },
  _isAdmin: function(UsersServices) {
    return UsersServices.isAuth; 
  },
}

function editDisplayTypeCtrl($scope, _editDisplayType, Upload, $window, $stateParams, $location, _getDisplayType, $localStorage, _isAdmin) {
  var self = this;
  this.param = {};

  var id = $stateParams.id;

  _isAdmin($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getDisplayType(id).then(function(data){
        self.param = data;
      });
    }
  });



  this.goBack = function(){
    $location.path("displays/list_display_types");
  }

  this.save = function(){
    _editDisplayType(this.param).then(function(success){
      if (success.status == 200){
        $location.path("displays/list_display_types");
      }
      else{
        console.log(success.status);
      }
    });
  }
}

editDisplayTypeCtrl.resolve = {
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
  _editDisplayType: function(DisplayTypesServices){
    return DisplayTypesServices.edit;
  },
  _getDisplayType: function(DisplayTypesServices){
    return DisplayTypesServices.get;
  },
  _isAdmin: function(UsersServices) {
    return UsersServices.isAuth; 
  },

}

angular
  .module('inspinia')
  .controller('listDisplayTypesCtrl', listDisplayTypesCtrl)
  .controller('addDisplayTypeCtrl', addDisplayTypeCtrl)
  .controller('editDisplayTypeCtrl', editDisplayTypeCtrl)
