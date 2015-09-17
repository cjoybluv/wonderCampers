WonderCampersApp.factory('UserService', ['$http', function($http) {

  return {
    // log the user in vai $http
    // trigger callback frunction when finished
    login: function(email, password, callback) {
      var self = this;
      $http.post('/api/auth',{
        email:email,
        password:password
      }).success(function(data){
        if(data && data.result && data.user){
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null,data);
      }).error(callback);
    },
    // check user login status via $http
    check: function(callback) {
      var self = this;
      $http.get('/api/auth').success(function(data){
        if(data && data.user){
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null,data);
      }).error(callback);
    },
    // log the user out via $http
    logout: function(callback) {
      this.currentUser = false;
      $http.delete('/api/auth')
      .success(function(data){
        callback(null,data);
      }).error(callback);
    },
    signup: function(firstName,lastName,email,password,callback) {
     var self = this;
      $http.post('/api/user',{
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      }).success(function(data){
        if(data && data.result && data.user){
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null,data);
      }).error(callback);
    }
  }
}]);