var app = angular.module('emc',
	[
		'ui.router',
		'emc.number',
		'common'
	]);
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('number',{
		url:'/',
		views:{
			"":{
				templateUrl:"number/number.html"
			}
		}
	})
})