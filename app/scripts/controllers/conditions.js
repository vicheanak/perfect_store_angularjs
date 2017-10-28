function listConditionsCtrl($scope,DTOptionsBuilder, _conditions, _displays, $location, _isAuth, $localStorage){
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
      _displays().then(function(displays){
        for (var i = 0; i < displays.length; i ++){
          if (displays[i].status == true){
            self.displays = displays;
          }
        }
      });

      _conditions().then(function(conditions){
        self.conditions = conditions;
      });
    }
  });


  this.edit = function(conditionId){
    $location.path('displays/edit_condition/'+conditionId);
  }
}

listConditionsCtrl.resolve = {
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
  _conditions: function(ConditionsServices){
    return ConditionsServices.all;
  },
  _displays: function(DisplaysServices){
    return DisplaysServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth
  }
}

function addConditionCtrl($scope, _createCondition, _displayTypes, _displays, Upload, $window, $location, $localStorage, _isManager) {
  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || "";
  this.param.token = $scope.token;

  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _displays().then(function(displays){
        self.displays = displays.records;
        self.param.display = 1;
      });
    }
  });

  this.goBack = function(){
    $location.path("stores/list_stores");
  }

  this.save = function(){
    console.log(self.param);
    _createCondition(self.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_stores");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

addConditionCtrl.resolve = {
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
  _createCondition: function(ConditionsServices){
    return ConditionsServices.create;
  },
  _displays: function(DisplaysServices){
    return DisplaysServices.all;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }

}

function editConditionCtrl($scope, _editCondition, _getCondition, _stores, Upload, $window, $stateParams, _isManager, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;


  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _storeTypes().then(function(storeTypes){
        self.storeTypes = storeTypes.records;
      });

      _getCondition(id).then(function(data){
        self.param = data;
        self.storeTypeId = self.param.storeTypeIdConditions;
      });
    }
  });



  this.goBack = function(){
    $location.path("stores/list_stores");
  }

  this.save = function(){
    console.log(this.param);
    _editCondition(this.param).then(function(success){
      if (success.status == 200){
        $location.path("stores/list_stores");
      }
      else{
        console.log(success.status);
      }
    });
  }

}

editConditionCtrl.resolve = {
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
  _editCondition: function(ConditionsServices){
    return ConditionsServices.edit;
  },
  _getCondition: function(ConditionsServices){
    return ConditionsServices.get;
  },
  _stores: function(StoresServices){
    return StoresServices.all;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

angular
.module('inspinia')
.controller('listConditionsCtrl', listConditionsCtrl)
.controller('addConditionCtrl', addConditionCtrl)
.controller('editConditionCtrl', editConditionCtrl)
