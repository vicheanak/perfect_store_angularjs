function listAuditorsCtrl($scope, DTOptionsBuilder, _stores, _auditors, _isAuth, $localStorage, $location){
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
      _auditors().then(function(auditors){
        self.auditors = auditors;
        console.log(self.auditors.records);
      });
      _stores().then(function(stores){
        self.stores = _stores;
      });
    }
  });

  this.showEdit = function(auditorId){
    $location.path('auditors/edit_auditor/'+auditorId);
  }
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
    return UsersServices.allAuditors;
  },
  _stores: function(StoresServices){
    return StoresServices.all;
  },
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth;
  },
}

function addAuditorCtrl($scope, _createAuditor, _stores, Upload, $window, _isManager, $localStorage, $location) {
  var self = this;
  this.param = {};
  this.param.status = true

  $scope.token = $localStorage.token || "";


  var self = this;
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _stores().then(function(stores){
        self.stores = stores.records;
      });
    }
  });


  this.goBack = function(){
    $location.path("auditors/list_auditors");
  }

  this.save = function(){
    console.log('self param ', self.param);
    _createAuditor(self.param).then(function(success){
      if (success.status == 200){
        $location.path("auditors/list_auditors");
      }
      else{
        console.log(success.status);
      }
    });
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
    },{
      files: ['js/plugins/moment/moment.min.js']
    }, {
      name: 'ui.knob',
      files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
    }, {
      files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
    }, {
      insertBefore: '#loadBefore',
      name: 'localytics.directives',
      files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
    }, {
      name: 'nouislider',
      files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
    }, {
      name: 'datePicker',
      files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
    }, {
      files: ['js/plugins/jasny/jasny-bootstrap.min.js']
    }, {
      files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
    }, {
      name: 'ui.switchery',
      files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
    }, {
      name: 'colorpicker.module',
      files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
    }, {
      name: 'ngImgCrop',
      files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
    }, {
      serie: true,
      files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
    }, {
      name: 'daterangepicker',
      files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
    }, {
      files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
    }, {
      name: 'ui.select',
      files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
    }, {
      files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
    }, {
      name: 'ngTagsInput',
      files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
    }, {
      files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
    }, {
      name: 'frapontillo.bootstrap-duallistbox',
      files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
    }
    ]);
  },
  _createAuditor: function(UsersServices){
    return UsersServices.createAuditor;
  },
  _stores: function(StoresServices){
    return StoresServices.all;
  },
  _isManager: function(UsersServices) {
    return UsersServices.isManager;
  },
}

function editAuditorCtrl($scope, _editAuditor, _getAuditor, _stores, Upload, $window, $stateParams, _isManager, $localStorage, $location) {
  var self = this;
  this.param = {};
  var id = $stateParams.id;

  $scope.token = $localStorage.token || "";

  var self = this;
  _isManager($scope.token).then(function(respond){
    if (respond == null){
      $location.path('/login');
    }
    else{
      _stores().then(function(stores){
        self.stores = stores.records;
      });

      _getAuditor(id).then(function(data){
        console.log(data);
        self.param = data;
      });
    }
  });


  this.goBack = function(){
    $location.path("auditors/list_auditors");
  }

  this.save = function(){
    console.log('param', this.param);
    _editAuditor(this.param).then(function(success){
      if (success.status == 200){
        $location.path("auditors/list_auditors");
      }
      else{
        console.log(success.status);
      }
    });
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
  },{
    files: ['js/plugins/moment/moment.min.js']
  }, {
    name: 'ui.knob',
    files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
  }, {
    files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
  }, {
    insertBefore: '#loadBefore',
    name: 'localytics.directives',
    files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
  }, {
    name: 'nouislider',
    files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
  }, {
    name: 'datePicker',
    files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
  }, {
    files: ['js/plugins/jasny/jasny-bootstrap.min.js']
  }, {
    files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
  }, {
    name: 'ui.switchery',
    files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
  }, {
    name: 'colorpicker.module',
    files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
  }, {
    name: 'ngImgCrop',
    files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
  }, {
    serie: true,
    files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
  }, {
    name: 'daterangepicker',
    files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
  }, {
    files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
  }, {
    name: 'ui.select',
    files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
  }, {
    files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
  }, {
    name: 'ngTagsInput',
    files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
  }, {
    files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
  }, {
    name: 'frapontillo.bootstrap-duallistbox',
    files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
  }
  ]);
 },
 _editAuditor: function(UsersServices){
  return UsersServices.editAuditor;
},
_getAuditor: function(UsersServices){
  return UsersServices.getAuditor;
},
_stores: function(StoresServices){
  return StoresServices.all;
},
_isManager: function(UsersServices) {
  return UsersServices.isAuth;
},
}

angular
.module('inspinia')
.controller('listAuditorsCtrl', listAuditorsCtrl)
.controller('addAuditorCtrl', addAuditorCtrl)
.controller('editAuditorCtrl', editAuditorCtrl)
