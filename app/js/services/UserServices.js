/**
 * Created by yangzx on 3/13/2015.
 */
angular.module('userServices', ['ngResource']).
    factory('UserInfoService', function($resource){
        return $resource('/userlist/:userId', {}, {
            query: {method:'GET', params:{userId:'userlist'}, isArray:true}
        });
    });