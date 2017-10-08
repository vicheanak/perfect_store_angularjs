function listAuditorsCtrl($scope, DTOptionsBuilder, _auditors){
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
  this.auditors = _auditors;
}

listAuditorsCtrl.resolve = {
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
  _auditors: function(UsersServices){
    return UsersServices.allAuditors();
  },
}

function addAuditorCtrl($scope, _createAuditor, Upload, $window) {
  var self = this;
  this.param = {};

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _createAuditor(self.param);
    };
  }
}

addAuditorCtrl.resolve = {
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
  _createAuditor: function(UsersServices){
    return UsersServices.createAuditor;
  }
}

function editAuditorCtrl($scope, _editAuditor, Upload, $window) {
  var self = this;
  this.param = {};

  this.save = function(){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(self.file);
    fileReader.onload = function (e) {
      var dataUrl = e.target.result;
      var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
      self.param.imageUrl = base64Data;
      _editAuditor(self.param);
    };
  }
}

editAuditorCtrl.resolve = {
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
  _editAuditor: function(UsersServices){
    return UsersServices.editAuditor;
  }
}

angular
  .module('inspinia')
  .controller('listAuditorsCtrl', listAuditorsCtrl)
  .controller('addAuditorCtrl', addAuditorCtrl)
  .controller('editAuditorCtrl', editAuditorCtrl)
