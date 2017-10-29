function listRewardsCtrl($scope, DTOptionsBuilder, _rewards, _isAuth, $location, $localStorage){
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
    $location.path('settings/edit_reward/'+id);
  }

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });

  _rewards().then(function(rewards){
    self.rewards = rewards;
  });

}

listRewardsCtrl.resolve = {
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
  _rewards: function(RewardsServices){
    return RewardsServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth;
  }
}

function addRewardCtrl($scope, _createReward, Upload, $window, $location, _isManager, $localStorage) {
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
    $location.path("settings/list_rewards");
  }

  this.save = function(){
    console.log(self.file);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createReward(self.param).then(function(success){
        if (success.status == 200){
          $location.path("settings/list_rewards");
        }
        else{
          console.log(success.status);
        }
      });
    };
  }
}

addRewardCtrl.resolve = {
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
  _createReward: function(RewardsServices){
    return RewardsServices.create;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

function editRewardCtrl($scope, _editReward, _getReward, Upload, $window, _isManager, $location, $localStorage, $stateParams) {
  var self = this;
  this.param = {};


  this.goBack = function(){
    $location.path("settings/list_rewards");
  }

  var id = $stateParams.id;
  var self = this;

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getReward(id).then(function(data){
        self.param = data;
        console.log(self.param);
      });
    }
  });


  this.save = function(){
    console.log('self param --> ', self.param);
    if (self.file){
      var fileReader = new FileReader();
      fileReader.readAsDataURL(self.file);
      fileReader.onload = function (e) {
        var dataUrl = e.target.result;
        var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        self.param.imageUrl = base64Data;
        _editReward(self.param).then(function(success){
          if (success.status == 200){
            $location.path("settings/list_rewards");
          }
          else{
            console.log(success.status);
          }
        });
      };
    }
    else{
      _editReward(self.param).then(function(success){
        if (success.status == 200){
          $location.path("settings/list_rewards");
        }
        else{
          console.log(success.status);
        }
      });
    }

  }
}

editRewardCtrl.resolve = {
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
  _getReward: function(RewardsServices){
    return RewardsServices.get;
  },
  _editReward: function(RewardsServices){
    return RewardsServices.edit;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

angular
.module('inspinia')
.controller('listRewardsCtrl', listRewardsCtrl)
.controller('addRewardCtrl', addRewardCtrl)
.controller('editRewardCtrl', editRewardCtrl)
