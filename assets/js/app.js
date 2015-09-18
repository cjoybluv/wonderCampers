
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


  // $mdThemingProvider.definePalette('wonderPalette', {
  //   '50': 'ffebee',
  //   '100': 'f0f4c3',  // celedon
  //   '200': 'ef9a9a',
  //   '300': 'e57373',
  //   '400': '8bc34a',  // lightgreen
  //   '500': 'f44336',
  //   '600': 'e53935',
  //   '700': '1b5e20',  // darkgreen
  //   '800': 'c62828',
  //   '900': 'b71c1c',
  //   'A100': '575757',  // grey
  //   'A200': 'ff5252',
  //   'A400': 'ffd740',  // yellow
  //   'A700': 'd50000',
  //   'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
  //                                       // on this palette should be dark or light
  //   'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
  //    '200', '300', '400', 'A100'],
  //   'contrastLightColors': undefined    // could also specify this if default was 'dark'
  // });
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('wonderPalette');

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

