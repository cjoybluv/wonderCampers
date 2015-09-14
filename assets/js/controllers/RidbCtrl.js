WonderCampersApp.controller('RidbCtrl', ['$scope','$modal','$rootScope','AlertService','$http','$sce', function($scope,$modal,$rootScope,AlertService,$http,$sce){
  console.log('Ridb controller');

  $rootScope.loading = false;

  $scope.iconSet = {
     "4":"_0015_auto-touring_13094.png",
     "5":"_0014_bicycle_536.png",
     "6":"_0005_rv_27045.png",
     "9":"_0013_camping_159381.png",
     "11":"_0011_fishing_662.png",
     "14":"_0010_hiking_45242.png",
     "15":"_0007_horse-trailer_4057.png",
     "20":"_0003_picnicbench_33638.png",
     "22":"_0008_winter-sports_51046.png",
     "23":"_0012_camper_675.png",
     "25":"_0002_snorkeling_146710.png",
     "26":"_0004_observationsite_100530.png",
     "27":"_0011_fishing_662.png",
     "28":"_0013_camping_159381.png",
     "30":"_0004_observationsite_100530.png",
     "31":"_0011_fishing_662.png",
     "32":"_0003_picnicbench_33638.png",
     "33":"_0004_observationsite_100530.png",
     "34":"_0009_swimming_136537.png",
     "35":"_0004_observationsite_100530.png",
     "36":"_0004_observationsite_100530.png",
     "37":"_0003_picnicbench_33638.png",
     "38":"_0003_picnicbench_33638.png",
     "39":"_0004_observationsite_100530.png",
     "43":"_0008_winter-sports_51046.png",
     "105":"_0006_paddling_45244.png",
     "106":"_0009_swimming_136537.png",
     "108":"_0002_snorkeling_146710.png",
     "109":"_0007_horse-trailer_4057.png"
  };

  $scope.searchTables = {};
  $scope.searchTables.usStates = [
      { name: 'ALABAMA', abbreviation: 'AL'},
      { name: 'ALASKA', abbreviation: 'AK'},
      { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
      { name: 'ARIZONA', abbreviation: 'AZ'},
      { name: 'ARKANSAS', abbreviation: 'AR'},
      { name: 'CALIFORNIA', abbreviation: 'CA'},
      { name: 'COLORADO', abbreviation: 'CO'},
      { name: 'CONNECTICUT', abbreviation: 'CT'},
      { name: 'DELAWARE', abbreviation: 'DE'},
      { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
      { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
      { name: 'FLORIDA', abbreviation: 'FL'},
      { name: 'GEORGIA', abbreviation: 'GA'},
      { name: 'GUAM', abbreviation: 'GU'},
      { name: 'HAWAII', abbreviation: 'HI'},
      { name: 'IDAHO', abbreviation: 'ID'},
      { name: 'ILLINOIS', abbreviation: 'IL'},
      { name: 'INDIANA', abbreviation: 'IN'},
      { name: 'IOWA', abbreviation: 'IA'},
      { name: 'KANSAS', abbreviation: 'KS'},
      { name: 'KENTUCKY', abbreviation: 'KY'},
      { name: 'LOUISIANA', abbreviation: 'LA'},
      { name: 'MAINE', abbreviation: 'ME'},
      { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
      { name: 'MARYLAND', abbreviation: 'MD'},
      { name: 'MASSACHUSETTS', abbreviation: 'MA'},
      { name: 'MICHIGAN', abbreviation: 'MI'},
      { name: 'MINNESOTA', abbreviation: 'MN'},
      { name: 'MISSISSIPPI', abbreviation: 'MS'},
      { name: 'MISSOURI', abbreviation: 'MO'},
      { name: 'MONTANA', abbreviation: 'MT'},
      { name: 'NEBRASKA', abbreviation: 'NE'},
      { name: 'NEVADA', abbreviation: 'NV'},
      { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
      { name: 'NEW JERSEY', abbreviation: 'NJ'},
      { name: 'NEW MEXICO', abbreviation: 'NM'},
      { name: 'NEW YORK', abbreviation: 'NY'},
      { name: 'NORTH CAROLINA', abbreviation: 'NC'},
      { name: 'NORTH DAKOTA', abbreviation: 'ND'},
      { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
      { name: 'OHIO', abbreviation: 'OH'},
      { name: 'OKLAHOMA', abbreviation: 'OK'},
      { name: 'OREGON', abbreviation: 'OR'},
      { name: 'PALAU', abbreviation: 'PW'},
      { name: 'PENNSYLVANIA', abbreviation: 'PA'},
      { name: 'PUERTO RICO', abbreviation: 'PR'},
      { name: 'RHODE ISLAND', abbreviation: 'RI'},
      { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
      { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
      { name: 'TENNESSEE', abbreviation: 'TN'},
      { name: 'TEXAS', abbreviation: 'TX'},
      { name: 'UTAH', abbreviation: 'UT'},
      { name: 'VERMONT', abbreviation: 'VT'},
      { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
      { name: 'VIRGINIA', abbreviation: 'VA'},
      { name: 'WASHINGTON', abbreviation: 'WA'},
      { name: 'WEST VIRGINIA', abbreviation: 'WV'},
      { name: 'WISCONSIN', abbreviation: 'WI'},
      { name: 'WYOMING', abbreviation: 'WY' }
  ];

  $scope.searchRecareas = function() {
    console.log('searchRecareas...',$scope.search.state);
    $rootScope.loading = true;
    $scope.recareas = [];
    $scope.facilities = [];
    $scope.search.recAreaID = '';

    return $http({
      url:'/api/ridb/recareas',
      params:{
        st: $scope.search.state
      }
    }).then(function(data){
      console.log('search return',data);
      $scope.recareas = data.data;
      $rootScope.loading = false;
      return data;
    });
  };

  $scope.searchFacilities = function() {
    console.log('searchFacilities...',$scope.search.recAreaID);
    $rootScope.loading = true;
    $scope.facilities = [];

    return $http({
      url:'/api/ridb/facilities',
      params:{
        recAreaID: $scope.search.recAreaID
      }
    }).then(function(data){
      console.log('search return',data);
      $scope.facilities = data.data;
      $rootScope.loading = false;
      return data;
    });
  };


}]);