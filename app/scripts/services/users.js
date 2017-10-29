function UsersServices($http, HostServices) {

  var auditorUrl = HostServices.name + '/auditors/';
  var managerUrl = HostServices.name + '/managers/';
  var regionalUrl = HostServices.name + '/regionals/';
  var url = HostServices.name + '/users/';
  var logoutUrl = HostServices.name + '/logout/';
  var isAuthUrl = HostServices.name + '/is_auth/';
  var isManagerUrl = HostServices.name + '/is_manager/';
  var isRegionalUrl = HostServices.name + '/is_regional/';
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


  function allManagers() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(managerUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createManager(param) {
    var data = param;
    param.role = 1;
    return $http({
      url: managerUrl,
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

  function editManager(param) {
    var data = param;
    var editManagerUrl = managerUrl + param.id;
    return $http({
      url: editManagerUrl,
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

  function getManager(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = managerUrl + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  function allRegionals() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(regionalUrl, config).then(function (response) {
      return response.data;
    });
  }

  function createRegional(param) {
    var data = param;
    param.role = 1;
    return $http({
      url: regionalUrl,
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

  function editRegional(param) {
    var data = param;
    var editRegionalUrl = regionalUrl + param.id;
    return $http({
      url: editRegionalUrl,
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

  function getRegional(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = regionalUrl + id;
    console.log(urlId);
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

  function isManager(token) {
    // console.log('Service token', token);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlManagerToken = isManagerUrl + token;
    return $http.get(urlManagerToken, config).then(function (response) {
      return response.data;
    });
  }

  function isRegional(token) {
    // console.log('lg regional token', token);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlRegionalToken = isRegionalUrl + token;
    return $http.get(urlRegionalToken, config).then(function (response) {
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
    allManagers: allManagers,
    createManager: createManager,
    editManager: editManager,
    getManager: getManager,
    allRegionals: allRegionals,
    createRegional: createRegional,
    editRegional: editRegional,
    getRegional: getRegional,
    isAuth: isAuth,
    isManager: isManager,
    isRegional: isRegional,
    auth: auth,
    outAuth: outAuth
  };
}
angular
.module('inspinia')
.factory('UsersServices', UsersServices);

