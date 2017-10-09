function RewardsServices($http, HostServices) {

  var url = HostServices.name + '/rewards';

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

  return {
    all: all,
    create: create,
    edit: edit
  };
}
angular
  .module('inspinia')
  .factory('RewardsServices', RewardsServices);

