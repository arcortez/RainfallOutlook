var app = angular.module("app", []); 

app.controller('Controller', ['$scope', function($scope) {
	$scope.showProvince = true;
	$scope.showMunicipality = false;

	$scope.provincedata = [];
	$scope.months = [];

	$scope.currentProvince = "allProvinces"
	$scope.municipalData = $scope.provincedata[0];

	$scope.loadProvinceData = function(){
		$scope.currentProvince = "allProvinces"
		$scope.showProvince = true;
		$scope.showMunicipality = false;
		$scope.provincedata = allMunicipalities;
		$scope.months = monthspan;
		console.log($scope.provincedata);
		console.log($scope.months);
		$scope.municipalData = $scope.provincedata[0];
	}

	$scope.changePresentProvince = function(string){
		console.log('accessed');
	}

	$scope.changeCurrentProvince = function(string){
		$scope.showMunicipality = true;
		$scope.showProvince = false;
		$scope.municipalData = $scope.provincedata[parseInt(string)];
		console.log($scope.municipalData)
	}

	function getColorVal(num){
		console.log('accessed '+num);
		if(num < 40){
			return "rgb(255,0,0)";
		}else if(num >= 40 && num <80){
			return "rgb(255,255,0)";
		}else if(num >=80 && num <=120){
			return "rgb(0,176,40)";
		}else if(num > 120){
			return "rgb(64,194,198)";
		}else{
			console.log('invalid input >> '+num);
		}
	}
}]);