function UsersServices($http, HostServices) {

  var auditorUrl = HostServices.name + '/auditors/';
  var adminUrl = HostServices.name + '/admins/';
  var viewerUrl = HostServices.name + '/viewers/';
  var url = HostServices.name + '/users/';
  var logoutUrl = HostServices.name + '/logout/';
  var isAuthUrl = HostServices.name + '/is_auth/';
  var isAdminUrl = HostServices.name + '/is_admin/';
  var isViewerUrl = HostServices.name + '/is_viewer/';
  var isAuditorUrl = HostServices.name + '/is_auditor/';
  var authUrl = HostServices.name + '/auth/';

  function allAuditors() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(auditorUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createAuditor(param) {
    var data = param;
    param.role = 3;
    return $http({
      url: auditorUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function editAuditor(param) {
    var data = param;
    var editAuditorUrl = auditorUrl + data.id;
    return $http({
      url: editAuditorUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function getAuditor(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = auditorUrl + id;
    return $http.get(urlId, config).then(function (response) {
      var storeIds = []
      for (var i = 0; i < response.data.USERS_STOREs.length; i ++){
        storeIds.push(response.data.USERS_STOREs[i].storeIdUsersStores);
      }
      response.data.storeIds = storeIds;
      return response.data;
    });
  };


  function allAdmins() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(adminUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createAdmin(param) {
    var data = param;
    param.role = 1;
    return $http({
      url: adminUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function editAdmin(param) {
    var data = param;
    var editAdminUrl = adminUrl + param.id;
    return $http({
      url: editAdminUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function getAdmin(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = adminUrl + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  function allViewers() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(viewerUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createViewer(param) {
    var data = param;
    param.role = 1;
    return $http({
      url: viewerUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function editViewer(param) {
    var data = param;
    var editViewerUrl = viewerUrl + param.id;
    return $http({
      url: editViewerUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': data.token
      },
      data: data
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  };

  function getViewer(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = viewerUrl + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };


  function isAuth(token) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlToken = isAuthUrl + token;
    return $http.get(urlToken, config).then(function (response) {
      return response.data;
    });
  }

  function isAdmin(token) {
    console.log('Service token', token);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlAdminToken = isAdminUrl + token;
    return $http.get(urlAdminToken, config).then(function (response) {
      return response.data;
    });
  }

  function isViewer(token) {
    console.log('lg viewer token', token);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlViewerToken = isViewerUrl + token;
    return $http.get(urlViewerToken, config).then(function (response) {
      return response.data;
    });
  }

  function auth(username, password){
    return $http({
      url: authUrl,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password
      }
    }).then(
    function(success){
      return success.data;
    },
    function(error){
      return error;
    }
    );
  }

  function outAuth(token){
    return $http({
      url: logoutUrl + '?token='+token,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        token: token
      }
    }).then(
    function(success){
      console.log(success);
      return success;
    },
    function(error){
      console.log(error);
      return error;
    }
    );
  }

  return {
    allAuditors: allAuditors,
    createAuditor: createAuditor,
    editAuditor: editAuditor,
    getAuditor: getAuditor,
    allAdmins: allAdmins,
    createAdmin: createAdmin,
    editAdmin: editAdmin,
    getAdmin: getAdmin,
    allViewers: allViewers,
    createViewer: createViewer,
    editViewer: editViewer,
    getViewer: getViewer,
    isAuth: isAuth,
    isAdmin: isAdmin,
    isViewer: isViewer,
    auth: auth,
    outAuth: outAuth
  };
}
angular
.module('inspinia')
.factory('UsersServices', UsersServices);

