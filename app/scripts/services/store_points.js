function StorePointsServices($http, HostServices) {

  var url = HostServices.name + '/store_points/';

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

  function edit (param) {
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
  .factory('StorePointsServices', StorePointsServices);

