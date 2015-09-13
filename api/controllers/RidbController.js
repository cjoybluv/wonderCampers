var request = require('request');
var async = require('async');

module.exports = {

  // GET - /api/ridb/....
  recareas: function(req,res) {
    var searchTerm = req.query.st;
    var pageOffset = 0;
    var activity = req.query.activity;
    var outOfData = false;
    var myData = [];
    var totalCount = 0;


    // var count = 0;

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
            pageOffset++;
            if(!error && response.statusCode === 200) {
              myData = myData.concat(JSON.parse(body).RECDATA);
              totalCount = JSON.parse(body).METADATA.RESULTS.TOTAL_COUNT;
              if (myData.length >= totalCount) {
                console.log('totalCount reached');
                outOfData = true;
              }
              // var myData = JSON.parse(body).RECDATA;
              // if (!myData.length){
              //   outOfData = true;
              // }
              // pageOffset += 1;
              console.log('RETURN',JSON.parse(body).RECDATA[0].RecAreaName);
              console.log('inc pageOffset',pageOffset);
              console.log('myData.length',myData.length);
              console.log('totalCount',totalCount.toString());
              // res.send(myData);
              // res.send(totalCount.toString());

            } else {
              res.send({
                error:error,
                code:response.statusCode
              });
            }
          });
          // count++;
          // callback();
          setTimeout(callback, 2000);
        },
        function (err) {
            // 5 seconds have passed
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

    console.log('facilities',searchTerm);

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
                console.log('totalCount reached');
                outOfData = true;
              }
              console.log('inc pageOffset',pageOffset);
              console.log('myData.length',myData.length);
              console.log('totalCount',totalCount.toString());

            } else {
              res.send({
                error:error,
                code:response.statusCode
              });
            }
          });
          setTimeout(callback, 2000);
        },
        function (err) {
            res.send(myData);
        }
    );
  }

};

