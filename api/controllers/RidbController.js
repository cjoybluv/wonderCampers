var request = require('request');
var async = require('async');
var geocoder = require('geocoder');

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
    var state = req.query.state;
    var query = req.query.query;
    var radius = req.query.radius;
    var placeName = req.query.placeName;
    var myData = [];
    var rqstParam = {};


    if (!facilityIDs && !query && !radius) {
      return false;
    }
    if (facilityIDs) {
      async.each(facilityIDs, function(facilityID, callback) {
        // console.log('Processing facility ',facilityID);

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
                // console.log('facilities PUSH',myData.length);
              } else {
                callback('error on request');
                // res.send({
                //   error:error,
                //   code:response.statusCode
                // });
              }
              callback();
            },function (err) {
                // console.log('facilities DONE',myData.length);
                myData.sort(sortFacilities);
                res.send(myData);
        });
      }, function(err){
          if( err ) {
            console.log('bad things');
          } else {
            // console.log('facilities DONE',myData.length);
            myData.sort(sortFacilities);
            res.send(myData);
          }
      });


    }
    if (query) {
      console.log('facilitiesQuery',query,state);
      var outOfData = false;
      var pageOffset = 0;
      var totalCount = 0;

      async.until(
        function () { return (outOfData); },
        function (callback) {
          request({
            url:'https://ridb.recreation.gov/api/v1/facilities.json',
            qs:{
              apikey:'5722E187D51D46678DC8F5B047FCB82E',
              state: state,
              query: query,
              offset: pageOffset*50,
              full:true
            }
          },function(error,response,body) {
            // console.log('response received ',pageOffset,totalCount);
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
            myData.sort(sortFacilities);
            res.send(myData);
        }
      );

    }

    if(radius && placeName) {
      // console.log('radius & placeName',radius,placeName);
      var coord = {};
      geocoder.geocode(placeName+", "+state, function ( err, data ) {
        if(typeof data.results[0] != 'undefined') {
          coord.lat = data.results[0].geometry.location.lat;
          coord.lng = data.results[0].geometry.location.lng;
        }
        // console.log('facilities :: radius',coord.lat,coord.lng);
        var outOfData = false;
        var pageOffset = 0;
        var totalCount = 0;

        async.until(
          function () { return (outOfData); },
          function (callback) {
            request({
              url:'https://ridb.recreation.gov/api/v1/facilities.json',
              qs:{
                apikey:'5722E187D51D46678DC8F5B047FCB82E',
                state: state,
                latitude: coord.lat,
                longitude: coord.lng,
                radius: radius,
                offset: pageOffset*50,
                full:true
              }
            },function(error,response,body) {
              // console.log('response received ',pageOffset,totalCount);
              pageOffset++;
              if(!error && response.statusCode === 200) {
                myData = myData.concat(JSON.parse(body).RECDATA);
                totalCount = JSON.parse(body).METADATA.RESULTS.TOTAL_COUNT;
                // console.log('response code 200 ',totalCount);
                if (myData.length >= totalCount) {
                  console.log('totalCount reached');
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
            console.log('async done');
            myData.sort(sortFacilities);
            console.log('myData.length',myData.length);
            res.send(myData);
          }
        );

      }); // geocoder
    }
  }

};
