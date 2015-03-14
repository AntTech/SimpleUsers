/**
 * Created by yangzx on 3/13/2015.
 */

'use strict';
var routerApp = angular.module('routerApp', ['ui.router','ngResource', 'ngGrid', 'userListModule']);

console.log("start app");

routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

routerApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    console.log("start router start");
    $stateProvider
        .state('index',{
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpl/home.html'
                },
                'main@index': {
                    templateUrl: 'tpl/login.html'
                }
            }
        })
        .state('main',{
            url: '/',
            views:{
                '':{
                    templateUrl:'tpl/userList.html'
                },
                'header@main':{
                    templateUrl:'tpl/header.html'
                },
                'userGrid@main':{
                    templateUrl:'tpl/userGrid.html'
                }
            }
        })
        .state('createUser',{
            url: '/createUser',
            templateUrl:'tpl/addUserForm.html'
        })
        .state('userInfo',{
            url: '/userInfo/:userId',
            templateUrl:'tpl/userDetail.html'
        })
        .state('updateUser',{
            url: '/updateUser/:userId',
            templateUrl:'tpl/addUserForm.html'
        });
}]);
