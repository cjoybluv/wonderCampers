
var WonderCampersApp = angular.module('WonderCampersApp',['ui.bootstrap','ngRoute','sailsResource','ngMessages','ngMaterial']);

WonderCampersApp.run(['UserService',function(UserService){

  console.log('wonderCamper reporting for duty');

  UserService.check(function(err,data){
    console.log('checking...',err,data);
  });

}]);

WonderCampersApp.config(['$routeProvider','$locationProvider','sailsResourceProvider',function($routeProvider, $locationProvider,sailsResourceProvider){

  sailsResourceProvider.configuration = {
    prefix: '/api',
    verbose: true
  };

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

