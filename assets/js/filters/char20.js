angular.module('WonderCampersApp')
    .filter('char20', [ function(){
        return function(text) {
          if (text.length<20) {
            return text;
          } else {
            text = text.replace('/',' ');
            return text.substring(0,text.substring(0,20).lastIndexOf(' '));
          }

        };
    }]);