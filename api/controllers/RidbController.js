var request = require('request');

module.exports = {

  // GET - /api/ridb/....
  recareas: function(req,res) {
    var searchTerm = req.query.st;
    var pageOffset = req.query.page;
    var activity = req.query.activity;

    request({
      url:'https://ridb.recreation.gov/api/v1/recareas.json',
      qs:{
        apikey:'5722E187D51D46678DC8F5B047FCB82E',
        state: searchTerm,
        offset: 50*pageOffset,
        activity: activity,
        full:true
      }
    },function(error,response,body) {
      if(!error && response.statusCode === 200) {
        var myData = JSON.parse(body).RECDATA;
        if (myData.length){
          res.send(myData);
        }else{
          res.send("OUT OF DATA");
        }

      } else {
        res.send({
          error:error,
          code:response.statusCode
        });
      }
    });

  }
};

