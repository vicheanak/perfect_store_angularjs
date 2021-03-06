function listIssuesCtrl($scope, DTOptionsBuilder, _issues, _isAuth, $location, $localStorage){
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
    $location.path('issues/edit_issue/'+id);
  }

  $scope.token = $localStorage.token || "";
  _isAuth($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{

    }
  });

  self.goDetail = function(id){
    console.log('detail');
    $location.path('issues/detail_issue/'+id);
  }

  _issues().then(function(issues){
    console.log('issues');
    console.log(issues);
    self.issues = issues;
  });

}

listIssuesCtrl.resolve = {
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
  _issues: function(IssuesServices){
    return IssuesServices.all;
  },
  _isAuth: function(UsersServices){
    return UsersServices.isAuth;
  }
}

function addIssueCtrl($scope, _createIssue, Upload, $window, $location, _isManager, $localStorage) {
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

  self.param.url = $location.search().url;

  self.param.application = 'Store Manager Web';

  self.param.issuedById = $localStorage.userId;




  this.goBack = function(){
    $location.path("issues/list_issues");
  }

  this.save = function(){
    console.log(self.file);
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createIssue(self.param).then(function(success){
        if (success.status == 200){
          $location.path("issues/list_issues");
        }
        else{
          console.log(success.status);
        }
      });
    };
  }
}

addIssueCtrl.resolve = {
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
  _createIssue: function(IssuesServices){
    return IssuesServices.create;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

function editIssueCtrl($scope, _editIssue, _getIssue, Upload, $window, _isManager, $location, $localStorage, $stateParams) {
  var self = this;
  this.param = {};


  this.goBack = function(){
    $location.path("issues/list_issues");
  }

  var id = $stateParams.id;
  var self = this;

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getIssue(id).then(function(data){
        self.param = data;
        self.param.priority = self.param.priority.toString();
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
        _editIssue(self.param).then(function(success){
          if (success.status == 200){
            $location.path("issues/list_issues");
          }
          else{
            console.log(success.status);
          }
        });
      };
    }
    else{
      _editIssue(self.param).then(function(success){
        if (success.status == 200){
          $location.path("issues/list_issues");
        }
        else{
          console.log(success.status);
        }
      });
    }
  }
}

editIssueCtrl.resolve = {
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
  _getIssue: function(IssuesServices){
    return IssuesServices.get;
  },
  _editIssue: function(IssuesServices){
    return IssuesServices.edit;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}


function detailIssueCtrl($scope, _editIssue, _getIssue, Upload, $window, _isManager, $location, $localStorage, $stateParams) {
  var self = this;
  this.param = {};


  this.goBack = function(){
    $location.path("issues/list_issues");
  }

  var id = $stateParams.id;
  var self = this;

  $scope.token = $localStorage.token || "";
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _getIssue(id).then(function(data){
        self.param = data;
        console.log(self.param);
      });
    }
  });

  this.goBack = function(){
    $location.path('/issues/list_issues');
  }
  this.goToEdit = function(id){
    $location.path('/issues/edit_issue/'+id);
  }


  this.save = function(){
    console.log('self param --> ', self.param);
    if (self.file){
      var fileReader = new FileReader();
      fileReader.readAsDataURL(self.file);
      fileReader.onload = function (e) {
        var dataUrl = e.target.result;
        var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        self.param.imageUrl = base64Data;
        _editIssue(self.param).then(function(success){
          if (success.status == 200){
            $location.path("issues/list_issues");
          }
          else{
            console.log(success.status);
          }
        });
      };
    }
    else{
      _editIssue(self.param).then(function(success){
        if (success.status == 200){
          $location.path("issues/list_issues");
        }
        else{
          console.log(success.status);
        }
      });
    }
  }
}

detailIssueCtrl.resolve = {
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
  _getIssue: function(IssuesServices){
    return IssuesServices.get;
  },
  _editIssue: function(IssuesServices){
    return IssuesServices.edit;
  },
  _isManager: function(UsersServices){
    return UsersServices.isManager;
  }
}

angular
.module('inspinia')
.controller('listIssuesCtrl', listIssuesCtrl)
.controller('addIssueCtrl', addIssueCtrl)
.controller('editIssueCtrl', editIssueCtrl)
.controller('detailIssueCtrl', detailIssueCtrl)
