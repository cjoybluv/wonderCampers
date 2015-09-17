WonderCampersApp.controller('AuthSignupDialogCtrl', ['$scope','UserService','$mdDialog', function($scope,UserService,$mdDialog){

  $scope.user={email:'',password:''};

  $scope.signup = function(){
    if ($scope.user.password===$scope.password2) {
      UserService.signup($scope.user.firstName, $scope.user.lastName, $scope.user.email, $scope.user.password, function(err,data){
        if(err){
          console.log(err);
          alert('Something terrible happened.');
        }else if(data && data.result) {
          $mdDialog.hide();
        } else {
          console.log(data);
          // alert('Unable to login.');
        }
      });
    } else {
      // alert('passwords do not match');
    }
  };

  $scope.hideSignup = function() {
    console.log('hiding signup');
    $mdDialog.hide();
  };

}]);