WonderCampersApp.controller('RidbCtrl', ['$scope','$rootScope','AlertService','$http','$sce','$mdDialog', function($scope,$rootScope,AlertService,$http,$sce,$mdDialog){
  console.log('Ridb controller');

  $rootScope.loading = false;


  $scope.filterList = [
    { "ActivityID": 5, "ActivityName": "BIKING" },
    { "ActivityID": 6, "ActivityName": "BOATING" },
    { "ActivityID": 11, "ActivityName": "FISHING" },
    { "ActivityID": 14, "ActivityName": "HIKING" },
    { "ActivityID": 15, "ActivityName": "RIDING" },
    { "ActivityID": 16, "ActivityName": "HUNTING" },
    { "ActivityID": 20, "ActivityName": "PICNIC" },
    { "ActivityID": 22, "ActivityName": "WINTER" },
    { "ActivityID": 25, "ActivityName": "SUMMER" },
    { "ActivityID": 26, "ActivityName": "WILDLIFE" },
    { "ActivityID": 28, "ActivityName": "WILDERNESS" },
    { "ActivityID": 43, "ActivityName": "SNOWPARK" },
    { "ActivityID": 106, "ActivityName": "SWIMMING" },
    { "ActivityID": 105, "ActivityName": "PADDLING" },
    { "ActivityID": 23, "ActivityName": "RV" }
  ];


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

  var recAreasReturned = [];
  var facilitiesReturned = [];
  var stFacilities = [];
  $scope.search = {};
  $scope.show = {};

  $scope.searchRecareas = function() {
    console.log('searchRecareas...',$scope.search.state);
    $rootScope.loading = true;
    $scope.recareas = [];
    $scope.facilities = [];
    $scope.activityFilter = [];
    $scope.search.recAreaID = '';
    $scope.search.campingOnly = false;
    $scope.search.query = '';


    return $http({
      url:'/api/ridb/recareas',
      params:{
        state: $scope.search.state
      }
    }).then(function(data){
      console.log('search return',data);
      $scope.recareas = data.data;
      recAreasReturned = data.data;
      $rootScope.loading = false;
      return data;
    });


  };

  var facRAFilter = function(fac) {
    var includeFac = false;
    if (typeof fac.ACTIVITY == 'object') {
      for (var i=0;i<fac.ACTIVITY.length;i++) {
        if ($scope.activityFilter.indexOf(fac.ACTIVITY[i].ActivityID) != -1) {
          includeFac = true;
        }
      }
    }
    return includeFac;
  };

  var getFacilityIDs = function(recAreaID) {
    var facilityIDs = [];
    for (var i=0;i<$scope.recareas.length;i++){
      if ($scope.recareas[i].RecAreaID==recAreaID) {
        for (var j=0;j<$scope.recareas[i].FACILITY.length;j++) {
          facilityIDs.push($scope.recareas[i].FACILITY[j].FacilityID);
        }
        return facilityIDs;
      }
    }
  };

  $scope.searchFacilities = function() {
    console.log('searchFacilities...',$scope.search.recAreaID);
    var facilityIDs = getFacilityIDs($scope.search.recAreaID);
    if (facilityIDs.length==0) { return false;}
    $rootScope.loading = true;
    $scope.facilities = [];
    $scope.activityFilter = [];
    $scope.search.campingOnly = false;
    $scope.search.query = '';

    $http({
      url:'/api/ridb/facilities',
      params:{
        // recAreaID: $scope.search.recAreaID
        facilityIDs: facilityIDs
      }
    }).then(function(data){
      console.log('search return',data);
      $scope.facilities = data.data;
      facilitiesReturned = data.data;
      $rootScope.loading = false;
      return data;
    });
  };

  $scope.searchQuery = function() {
    console.log('searchOnQuery...',$scope.search.query);
    $rootScope.loading = true;
    $scope.facilities = [];
    $scope.activityFilter = [];
    $scope.search.campingOnly = false;

    $http({
      url:'/api/ridb/facilities',
      params:{
        query: $scope.search.query,
        state: $scope.search.state
      }
    }).then(function(data){
      console.log('search return',data);
      $scope.facilities = data.data;
      facilitiesReturned = data.data;
      $rootScope.loading = false;
      return data;
    });
  };

  $scope.getSearchRAName = function() {
    if (typeof $scope.search != 'undefined' && typeof $scope.search.query == 'string') {
      return $scope.search.query;
    } else if ($scope.recareas) {
      for (var i = 0; i<$scope.recareas.length;i++){
        if ($scope.recareas[i].RecAreaID == $scope.search.recAreaID) {
          return $scope.recareas[i].RecAreaName;
        }
      }
    }
  };

  var raActFilter = function(ra) {
    var activityFound = false;
    var hasCamping = false;
    var campingOnly = $scope.search.campingOnly;
    var filterCount = $scope.activityFilter.length;
    if (typeof ra.ACTIVITY == 'object') {
      // console.log('raFilter',ra.ACTIVITY);
      for (var i=0;i<ra.ACTIVITY.length;i++) {
        if (campingOnly) {
          if (ra.ACTIVITY[i].ActivityID == 9) {
            hasCamping = true;
          }
          if (filterCount > 0) {
            if ($scope.activityFilter.indexOf(ra.ACTIVITY[i].ActivityID) != -1) {
              activityFound = true;
            }
          } else {
            activityFound = true;
          }
        } else {
          if ($scope.activityFilter.indexOf(ra.ACTIVITY[i].ActivityID) != -1) {
            activityFound = true;
          }
        }
      }
    }
    var includeRec = false;
    if (campingOnly) {
      if (hasCamping) {
        if (filterCount>0) {
          if (activityFound) {
            includeRec = true;
          }
        } else {
          includeRec = true;
        }
      }
    } else {
      if (filterCount>0) {
        if (activityFound) {
          includeRec = true;
        }
      } else {
        includeRec = true;
      }
    }
    return includeRec;
  };

  var facActFilter = function(fac) {
    var activityFound = false;
    var hasCamping = false;
    var campingOnly = $scope.search.campingOnly;
    var filterCount = $scope.activityFilter.length;
    if (typeof fac.ACTIVITY == 'object') {
      // console.log('raFilter',fac.ACTIVITY);
      for (var i=0;i<fac.ACTIVITY.length;i++) {
        if (campingOnly) {
          if (fac.ACTIVITY[i].ActivityID == 9) {
            hasCamping = true;
          }
          if (filterCount > 0) {
            if ($scope.activityFilter.indexOf(fac.ACTIVITY[i].ActivityID) != -1) {
              activityFound = true;
            }
          } else {
            activityFound = true;
          }
        } else {
          if ($scope.activityFilter.indexOf(fac.ACTIVITY[i].ActivityID) != -1) {
            activityFound = true;
          }
        }
      }
    }
    var includeRec = false;
    if (campingOnly) {
      if (hasCamping) {
        if (filterCount>0) {
          if (activityFound) {
            includeRec = true;
          }
        } else {
          includeRec = true;
        }
      }
    } else {
      if (filterCount>0) {
        if (activityFound) {
          includeRec = true;
        }
      } else {
        includeRec = true;
      }
    }
    return includeRec;
  };

  $scope.campingOnly = function() {
    if ($scope.facilities.length == 0) {
      if ($scope.search.campingOnly || ($scope.activityFilter.length > 0)) {
        $scope.recareas = [];
        $scope.recareas = recAreasReturned.filter(raActFilter);

      } else {
        $scope.recareas = recAreasReturned;
      }
    } else {
      if ($scope.search.campingOnly || ($scope.activityFilter.length > 0)) {
        $scope.facilities = [];
        $scope.facilities = facilitiesReturned.filter(facActFilter);
      } else {
        $scope.facilities = facilitiesReturned;
      }
    }
  };

  $scope.activityFilter = [];
  $scope.activityClicked = function(id) {
    console.log('activityClicked',id);
    if ($scope.activityFilter.indexOf(parseInt(id)) == -1) {
      $scope.activityFilter.push(parseInt(id));
    } else {
      $scope.activityFilter.splice($scope.activityFilter.indexOf(parseInt(id)),1);
    }
    if ($scope.activityFilter.length == 0 && !$scope.search.campingOnly) {
      console.log('listZero',$scope.activityFilter);
      if ($scope.facilities.length == 0) {
        $scope.recareas = recAreasReturned;
      } else {
        $scope.facilities = facilitiesReturned;
      }
      return true;
    }
    if ($scope.facilities.length == 0) {
      $scope.recareas = [];
      $scope.recareas = recAreasReturned.filter(raActFilter);
    } else {
      $scope.facilities = [];
      $scope.facilities = facilitiesReturned.filter(facActFilter);
    }
  };

  $scope.isFiltered = function(id) {
    return $scope.activityFilter.indexOf(parseInt(id)) != -1;
  };


  // $scope.greeting = 'HellYeah';

  $scope.hide = $mdDialog.hide;
  // $scope.showDialog = showRA;

  $scope.showRA = function(recArea,evt) {
    console.log('showRA',recArea);

    $scope.recArea = recArea;
    // var thisScope = $scope;
    // var saveScope = $scope;
    // var chips = [
    //   { "name": "Activities", "id": "ACTIVITY" },
    //   { "name": "Links", "id": "LINK" },
    //   { "name": "Events", "id": "EVENT" },
    //   { "name": "Media", "id": "MEDIA" },
    //   { "name": "Facilities", "id": "FACILITY" },
    // ];

    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: evt,
      controller: DialogController,
      // controller: 'ShowRADialogCtrl',
      // controllerAs: 'ctrl',
      // scope: thisScope,
      locals: {
        recArea: $scope.recArea
      },
      templateUrl: '/views/discover/RADialog.html',
      parent: parentEl,
      // bindToController: true,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      console.log('You said the information was "' + answer + '".');
      // $scope = saveScope;
    }, function() {
      console.log('You cancelled the dialog.');
      // $scope = saveScope;
    });
  };


  var DialogController = ['scope','$mdDialog','recArea', function(scope, $mdDialog, recArea) {
    scope.recArea = recArea;

    scope.answer = function(answer) {
      console.log('ShowRADialogCtrl:answer',answer);
    }

    scope.hide = function() {
      $mdDialog.hide();
    }
  }];

  $scope.showFacility = function(facility,evt) {
    console.log('showFacility',facility);

    $scope.facility = facility;

    var parentEl = angular.element(document.body);
    $mdDialog.show({
      targetEvent: evt,
      controller: FacDialogCtrl,
      locals: {
        facility: $scope.facility
      },
      templateUrl: '/views/discover/facilityDialog.html',
      parent: parentEl,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      console.log('You said the information was "' + answer + '".');
    }, function() {
      console.log('You cancelled the dialog.');
    });
  };

  var FacDialogCtrl = ['scope','$mdDialog','facility', function(scope, $mdDialog, facility) {
    scope.facility = facility;

    scope.answer = function(answer) {
      console.log('ShowFacDialogCtrl:answer',answer);
    }

    scope.hide = function() {
      $mdDialog.hide();
    }
  }];



}]);