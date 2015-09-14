angular.module('WonderCampersApp')
    .filter('shortDesc', [ function(){
        return function(text) {
            return text.substring(0,text.indexOf(' ',200));
        };
    }]);