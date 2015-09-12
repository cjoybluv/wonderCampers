WonderCampersApp.controller('AuthLoginModalCtrl', ['$scope','UserService','$modalInstance', function($scope,UserService,$modalInstance){

  $scope.user={email:'',password:''};

  $scope.login = function(){
    UserService.login($scope.user.email, $scope.user.password, function(err,data){
      if(err){
        console.log(err);
        alert('Something terrible happened.');
      }else if(data && data.result) {
        $modalInstance.close();
      } else {
        console.log(data);
        alert('Unable to login.');
      }
    });
  };

}]);