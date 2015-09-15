angular.module('WonderCampersApp')
    .filter('shortDesc', [ function(){
        return function(text) {
          if (text.length<200) {
            return text;
          } else {
            return text.substring(0,text.indexOf(' ',200));
          }

        };
    }]);