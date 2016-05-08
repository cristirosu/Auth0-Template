'use strict';

var myApp = angular.module('myApp', ['auth0', 'ngMaterial', 'ui.router', 'angular-storage', 'angular-jwt'])

.config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){
    $urlRouterProvider.otherwise("/home");

    authProvider.init({
      domain:'cristi-red.eu.auth0.com',
      clientID: 'GlOFz3uE2vvKUskuQxq0tm2fCEGoaXR3'
    });

    jwtInterceptorProvider.tokenGetter = function(store){
      return store.get('id_token');
    }

    $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "/home/home.tpl.html"
    })
    .state("profile", {
      url: "/profile",
      templateUrl: "/profile/profile.tpl.html",
      controller: "profileControllers"
    })

    $httpProvider.interceptors.push("jwtInterceptor");
    console.log("pushed");
})
.run(function($rootScope, auth, store, jwtHelper, $location){
  $rootScope.$on("$locationChangeStart", function(){
    var token = store.get('id_token');
    if(token){
      if(!jwtHelper.isTokenExpired(token)){
        if(!auth.isAuthenticated){
          auth.authenticate(store.get('profile'), token);
        }
      }
    }
    else{
      $location.path("/home");
    }
  })
})
