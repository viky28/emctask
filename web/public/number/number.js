angular.module('emc.number',['ngMessages'])

.controller("numberCtrl",['$scope','$timeout','postService', function($scope,$timeout,postService){
	
	$scope.savemultiple = function(){
		console.log("inside submit")
		var data = {
			cmd:"saveData",
			params:{
				firstNum:$scope.firstNum,
				secondNum:$scope.secondNum,
				multiple:$scope.getMultiplication()
			}
		}
		console.log("data")
		postService.getPromise(data)
		.then(function(data,status,header,config){
			console.log("success",data)
		},function(data,status,header,config){
			console.log("error",data)
		})
	}

	$scope.getMultiplication = function(){
		return "Result :>"+ ($scope.firstNum) * ($scope.secondNum);
	}

	var data = {
		cmd:"getData"
	}
	postService.getPromise(data)
	.then(function(data,status,header,config){
		console.log("success",data)
		$scope.firstNum = data.data.result[0].firstNum;
		$scope.secondNum = data.data.result[0].secondNum;
	},function(data,status,header,config){
		console.log("error",data)
	})

}])
.service('postService', function($http,Config){
	this.getPromise = function(data){
		var header = Config.headers;
		var host = Config.baseURL;
		return $http.post(host,data,header);
	}
})