/**
 * Created by yangzx on 3/13/2015.
 */
'use strict';
var userInfoModule = angular.module("UserInfoModule", []);
userInfoModule.controller('UserInfoCtrl', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);


});