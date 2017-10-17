function HostServices() {
  //var hostName = 'https://api.unilever.store';
  var hostName = 'http://localhost:3000';
  return {
    name: hostName,
  };
}
angular
  .module('inspinia')
  .factory('HostServices', HostServices);
