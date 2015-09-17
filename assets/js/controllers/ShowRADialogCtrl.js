WonderCampersApp.controller('ShowRADialogCtrl', ['$scope','$mdDialog', function($scope,$mdDialog){

  console.log('ShowRADialogCtrl');

  $scope.answer = function(answer) {
    console.log('ShowRADialogCtrl:answer',answer);

  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

}]);