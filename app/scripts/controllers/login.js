function loginCtrl($scope, $location, _isAuth, _auth, $localStorage){

  var self = this;
  this.param = {};

  $scope.token = $localStorage.token || false;

  _isAuth($scope.token).then(function(respond){
    if (respond){
      if (respond.id){
        $location.path('/stores/stores_rewards')
      }
    }
  });

  $scope.$watch('token', function() {
    $localStorage.token = $scope.token;
  });

  this.login = function(){
    this.failedAuthMessage = '';
    _auth(this.username, this.password).then(function(data){
      if (data.err){
        self.failedAuthMessage = data.err;
      }
      else{
        $localStorage.token = data.token;
        $location.path('/stores/stores_rewards')
      }
    });
  }

  this.forgetPassword = function(){
    console.log('forget password');
  }

}

loginCtrl.resolve = {
  _isAuth: function(UsersServices) {
    return UsersServices.isAuth; 
  },
  _auth: function(UsersServices) {
    return UsersServices.auth; 
  },
  _outAuth: function(UsersServices){
    return UsersServices.outAuth;
  }
}


angular
  .module('inspinia')
  .controller('loginCtrl', loginCtrl)
