WonderCampersApp.controller('ShowRADialogCtrl', ['$scope','$mdDialog', function($scope,$mdDialog){

  console.log('ShowRADialogCtrl');


  $scope.hide = function() {
    $mdDialog.hide();
  };

}]);