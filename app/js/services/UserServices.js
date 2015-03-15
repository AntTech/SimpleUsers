/**
 * Created by yangzx on 3/13/2015.
 */
angular.module('userServices', ['ngResource']).
    factory('UserInfoService', function($resource){
        return $resource('/userlist/:userId', {}, {
            query: {method:'GET', params:{userId:'userlist',userName:''}, isArray:true},
            save: {method:'POST'},
            get: {method:'GET'}
        });
    }).
    factory('UserService', function($resource){
        return function( url, params, methods ) {
		    var defaults = {
		      update: { method: 'put', isArray: false },
		      create: { method: 'post' }
		    };
		     
		    methods = angular.extend( defaults, methods );
		 
		    var resource = $resource( url, params, methods );
		 
		    resource.prototype.$save = function() {
		      if ( !this.id ) {
		        return this.$create();
		      }
		      else {
		        return this.$update();
		      }
		    };
		 
		    return resource;
		  };

    });