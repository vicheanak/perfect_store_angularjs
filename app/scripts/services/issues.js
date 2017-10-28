function IssuesServices($http, HostServices) {

  var url = HostServices.name + '/issues/';

  function all() {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return $http.get(url, config).then(function (response) {
      return response.data;
    });
  }

  function create (param) {
    var data = param;
    return $http({
      url: url,
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

  function edit (param) {
    var data = param;
    var editurl = url + param.id;
    return $http({
      url: editurl,
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

  function get(id) {
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    var urlId = url + id;
    return $http.get(urlId, config).then(function (response) {
      return response.data;
    });
  };

  return {
    all: all,
    create: create,
    edit: edit,
    get: get
  };
}
angular
  .module('inspinia')
  .factory('IssuesServices', IssuesServices);

