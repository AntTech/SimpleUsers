/**
 * Created by yangzx on 3/13/2015.
 */
'use strict';
var userInfoModule = angular.module("userInfoModule", ['ngResource', 'userServices']);
userInfoModule.controller('UserInfoCtrl', function($scope, $state, $stateParams, $resource, UserInfoService) {
	console.log($stateParams);
	//var userInfo = UserInfoService.get({userId:});
	$scope.userModel = UserInfoService.get({
		userId: $stateParams.userId
	});
	console.log($scope.userModel);
});
userInfoModule.controller('NewUserInfoCtrl', function($scope, $state, $stateParams, $resource, UserInfoService) {
	console.log($stateParams);
	$scope.createUser = function() {
		var user = $resource('/userInfo');
		var userModel = {
			UserId:$scope.userModel.UserId,
			UserName:$scope.userModel.UserName,
			PassWord:$scope.userModel.PassWord,
			Sex:$scope.userModel.Sex,
			Age:$scope.userModel.Age,
			Email:$scope.userModel.Email,
			Phone:$scope.userModel.Phone,
			Address:$scope.userModel.Address
		};
   		user.save(userModel, function(doc){
			console.log(doc);
			alert('保存成功！');
			location.href="#/";
   		});

	};
	
});
userInfoModule.controller('UpdateUserInfoCtrl', function($scope, $state, $stateParams, $resource, UserInfoService) {
	console.log($stateParams);
	var userInfo = UserInfoService.get({userId:$stateParams.userId});
	$scope.userModel = userInfo;
	
	console.log(userInfo);
	$scope.updateUser = function() {
		var user = $resource('/userInfo/:userId',{userId:$stateParams.userId});
		var userModel = {
			UserId: $stateParams.userId,
			UserName:$scope.userModel.UserName,
			PassWord:$scope.userModel.PassWord,
			Sex:$scope.userModel.Sex,
			Age:$scope.userModel.Age,
			Email:$scope.userModel.Email,
			Phone:$scope.userModel.Phone,
			Address:$scope.userModel.Address
		};
   		user.save(userModel, function(doc){
			console.log(doc);
			alert('保存成功！');
			location.href="#/";
   		});

		console.log($scope.userModel);
		var userModel = $scope.userModel;
		//UserInfoService.save();

		//$scope.userList.push($scope.userModel);
	};
});