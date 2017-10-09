function HostServices() {
  return {
    name: 'https://api.unilever.store',
  };
}
angular
  .module('inspinia')
  .factory('HostServices', HostServices);
