function HostServices() {
  return {
    name: 'http://localhost:3000',
  };
}
angular
  .module('inspinia')
  .factory('HostServices', HostServices);
