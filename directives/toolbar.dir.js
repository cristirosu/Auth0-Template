(function(){
  'use strict';

  angular.module('myApp')
  .directive('toolbar', toolbar);

  function toolbar() {
    return{
      templateUrl: 'directives/toolbar.tpl.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }

  function toolbarController(auth, store, $location, $scope){
    $scope.auth = auth;

    //Authentication built in
    $scope.login = function(){
      auth.signin({}, function(profile,token){
        store.set("profile", profile);
        store.set("id_token", token);
        console.log(auth.isAuthenticated);
        $location.path("/home");
      }, function(err){
      console.log(err);
    })
    }

    $scope.logout = function(){
      store.remove("profile");
      store.remove("id_token");
      auth.signout();
    }
  }
})();
