function loginCtrl($scope, $location){
  this.login = function(){
    $location.path('stores/list_stores');
  }
}

loginCtrl.resolve = {
  isAuth: function(UsersServices) {
    return UsersServices.isAuth(); 
  },
  auth: function(UsersServices) {
    return UsersServices.auth; 
  },
  outAuth: function(UsersServices){
    return UsersServices.outAuth;
  }
}


angular
  .module('inspinia')
  .controller('loginCtrl', loginCtrl)
