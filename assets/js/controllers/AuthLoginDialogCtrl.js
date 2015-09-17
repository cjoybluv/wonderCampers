WonderCampersApp.controller('AuthLoginDialogCtrl', ['$scope','UserService','$mdDialog', function($scope,UserService,$mdDialog){

  $scope.user={email:'',password:''};

  $scope.login = function(){
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
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);