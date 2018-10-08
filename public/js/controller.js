var app = angular.module("app", []); 

app.controller('Controller', ['$scope', function($scope) {
	$scope.provincedata = [];
	$scope.months = [];

	$scope.golly = function(){
		$scope.provincedata = allMunicipalities;
		$scope.months = monthspan;
		console.log($scope.months)
		console.log($scope.provincedata)
	}
}]);