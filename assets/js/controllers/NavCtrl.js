WonderCampersApp.controller('NavCtrl', ['$scope','UserService','$mdDialog', function($scope,UserService,$mdDialog){

  // UserService.logout();
  console.log('nav ctrl new');

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  $scope.showLogin = function(ev) {
    console.log('login clicked',ev);
    $mdDialog.show({
      controller: 'AuthLoginDialogCtrl',
      templateUrl: '/views/auth/loginDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      // console.log('You said the information was "' + answer + '".');
    }, function() {
      // console.log('You cancelled the dialog.');
    });
  };

  $scope.showSignup = function(ev) {
    console.log('signup clicked',ev);
    $mdDialog.show({
      controller: 'AuthSignupDialogCtrl',
      templateUrl: '/views/auth/signupDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(data){
      // you hit ok
    }, function() {
      // you hit cancel
    });
  };

  $scope.logout = function() {
    UserService.logout(function(err,data){
      //do nothing...
    });
  };

}]);
