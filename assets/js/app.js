
var WonderCampersApp = angular.module('WonderCampersApp',['ngRoute','sailsResource','ngMessages','ngMaterial','ngSanitize']);

WonderCampersApp.run(['UserService',function(UserService){

  console.log('wonderCamper reporting for duty');

  UserService.check(function(err,data){
    console.log('checking...',err,data);
  });

}]);

WonderCampersApp.config(['$routeProvider','$locationProvider','sailsResourceProvider','$mdThemingProvider',function($routeProvider, $locationProvider,sailsResourceProvider,$mdThemingProvider){

  sailsResourceProvider.configuration = {
    prefix: '/api',
    verbose: true
  };

  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('green');

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',{
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/about',{
    templateUrl: '/views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/ridb',{
    templateUrl: '/views/ridb.html',
    controller: 'RidbCtrl'
  })
  .otherwise({
    templateUrl:'/views/404.html'
  });

}]);

