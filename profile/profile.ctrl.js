(function() {
  'use strict';

  angular
  .module("myApp")
  .controller("profileControllers", profileControllers);

  function profileControllers($scope, $http){
    var vm = this;
    $scope.message = 'Hellooooo!';

    $scope.getPrivateMessage = function(){
      $http({
        method: "GET",
        url: "http://localhost:8081/RestEasy/rest/message/1",
        headers:{
          'Access-Control-Allow-Origin' : 'true'
        }
      })
        .then(function(response){
          console.log(response.data);
        })
    }
  }
})();
