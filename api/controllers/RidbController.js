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
    var state = req.query.state;
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
              state: state,
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
              // setTimeout(callback, 5);
              callback(null);
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
    var facilityIDs = req.query.facilityIDs;
    var myData = [];

    // console.log('facilities',searchTerm);

    if (!facilityIDs) {
      return false;
    }

    async.each(facilityIDs, function(facilityID, callback) {
      console.log('Processing facility ',facilityID);

      request({
          url:'https://ridb.recreation.gov/api/v1/facilities/'+facilityID.toString(),
          qs:{
              apikey:'5722E187D51D46678DC8F5B047FCB82E',
              full:true
            }
          },function(error,response,body) {
            // console.log('response received ' + pageOffset);
            if(!error && response.statusCode === 200) {
              myData.push(JSON.parse(body));
              console.log('facilities PUSH',myData.length);
            } else {
              callback('error on request');
              // res.send('BAD THINGS');
              // res.send({
              //   error:error,
              //   code:response.statusCode
              // });
            }
            callback();
          },function (err) {
              console.log('facilities DONE',myData.length);
              myData.sort(sortFacilities);
              res.send(myData);
      });
    }, function(err){
        if( err ) {
          console.log('bad things');
        } else {
          console.log('facilities DONE',myData.length);
          myData.sort(sortFacilities);
          res.send(myData);
        }
    });

  }

};
