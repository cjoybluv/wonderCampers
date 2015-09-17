WonderCampersApp.controller('AuthSignupDialogCtrl', ['$scope','UserService','$mdDialog', function($scope,UserService,$mdDialog){

  $scope.user={firstName:'',lastName:'',email:'',password:''};

  $scope.signup = function(){
    if ($scope.user.password && ($scope.user.password===$scope.password2)) {
      UserService.signup($scope.user.firstName, $scope.user.lastName, $scope.user.email, $scope.user.password, function(err,data){
        if(err){
          console.log(err);
          alert('That email is in use.');
        }else if(data && data.result) {
          console.log('signup success',data.result);
        } else {
          console.log('able to signup',data);
          alert('Welcome - You have signed-up for Wonder Campers! Now Logging you in...');
          $scope.currentUser = data;

         UserService.login($scope.user.email, $scope.user.password, function(err,data){
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
        }
        $mdDialog.hide();
      });
    } else {
      // alert('passwords d o not match');
      console.log('passwords do not match');
    }
  };

  $scope.hideSignup = function() {
    console.log('hiding signup');
    $mdDialog.hide();
  };

}]);