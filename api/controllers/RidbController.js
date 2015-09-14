var request = require('request');
var async = require('async');

function sortRecareas(a,b) {
  if (a.RecAreaName < b.RecAreaName)
    return -1;
  if (a.RecAreaName > b.RecAreaName)
    return 1;
  return 0;
}

function sortFacilities(a,b) {
  if (a.FacilityName < b.FacilityName)
    return -1;
  if (a.FacilityName > b.FacilityName)
    return 1;
  return 0;
}


module.exports = {

  // GET - /api/ridb/....
  recareas: function(req,res) {
    var searchTerm = req.query.st;
    var pageOffset = 0;
    var activity = req.query.activity;
    var outOfData = false;
    var myData = [];
    var totalCount = 0;

    async.until(
        function () { return (outOfData); },
        function (callback) {
          request({
            url:'https://ridb.recreation.gov/api/v1/recareas.json',
            qs:{
              apikey:'5722E187D51D46678DC8F5B047FCB82E',
              state: searchTerm,
              offset: pageOffset*50,
              full:true
            }
          },function(error,response,body) {
            // console.log('response received ' + pageOffset);
            pageOffset++;
            if(!error && response.statusCode === 200) {
              myData = myData.concat(JSON.parse(body).RECDATA);
              totalCount = JSON.parse(body).METADATA.RESULTS.TOTAL_COUNT;
              if (myData.length >= totalCount) {
                // console.log('totalCount reached');
                outOfData = true;
              }
              setTimeout(callback, 5);

            } else {
              res.send({
                error:error,
                code:response.statusCode
              });
            }

          });
        },
        function (err) {
          // console.log('async done');
            myData.sort(sortRecareas);
            res.send(myData);
        }
    );
  },

    facilities: function(req,res) {
    var searchTerm = req.query.recAreaID.toString();
    var pageOffset = 0;
    var activity = req.query.activity;
    var outOfData = false;
    var myData = [];
    var totalCount = 0;

    // console.log('facilities',searchTerm);

    if (!searchTerm) {
      return false;
    }
    async.until(
        function () { return (outOfData); },
        function (callback) {

          request({
            url:'https://ridb.recreation.gov/api/v1/recareas/'+searchTerm+'/facilities.json',
            qs:{
              apikey:'5722E187D51D46678DC8F5B047FCB82E',
              offset: pageOffset*50,
              full:true
            }
          },function(error,response,body) {
            pageOffset++;
            if(!error && response.statusCode === 200) {
              myData = myData.concat(JSON.parse(body).RECDATA);
              totalCount = JSON.parse(body).METADATA.RESULTS.TOTAL_COUNT;
              if (myData.length >= totalCount) {
                // console.log('totalCount reached');
                outOfData = true;
              }
              setTimeout(callback, 5);
            } else {
              res.send({
                error:error,
                code:response.statusCode
              });
            }
          });
        },
        function (err) {
          myData.sort(sortFacilities);
          res.send(myData);
        }
    );
  }

};

