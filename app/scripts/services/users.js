function UsersServices($http, HostServices) {

  var url = HostServices.name + '/users';

  function allAuditors() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function createAuditor(param) {
    var data = param;
    $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

  function allAdmins() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function createAdmin(param) {
    var data = param;
    $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

  function allViewers() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function createViewer(param) {
    var data = param;
    $http({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

  function isAuth(param) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function auth(){
    var data = param;
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
  }

  function outAuth(){
    var data = param;
    $http({
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
  }

  return {
    allAuditors: allAuditors,
    createAuditor: createAuditor,
    editAuditor: editAuditor,
    allAdmins: allAdmins,
    createAdmin: createAdmin,
    editAdmin: editAdmin,
    allViewers: allViewers,
    createViewer: createViewer,
    editViewer: editViewer,
    isAuth: isAuth,
    auth: auth,
    outAuth: outAuth
  };
}
angular
  .module('inspinia')
  .factory('UsersServices', UsersServices);

