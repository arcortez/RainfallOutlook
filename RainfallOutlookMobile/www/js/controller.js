var app = angular.module("app", []); 

app.controller('Controller', ['$scope', function($scope) {
	$scope.showProvince = true;
	$scope.showMunicipality = false;

	$scope.provincedata = [];
	$scope.months = [];

	$scope.currentProvince = "allProvinces"
	$scope.currentMunicipality = "all"

	$scope.municipalData = $scope.provincedata[39]; // Laguna

	$scope.currentScheme;

	$scope.loadingbar = true;

	$scope.notif = "Loading Data. Please Wait.";

	$scope.displayarr = [];


	$scope.loadProvinceData = function(){
		$scope.currentProvince = "allProvinces"
		$scope.showProvince = true;
		$scope.showMunicipality = false;
		$scope.provincedata = allMunicipalities;
		$scope.months = monthspan;
		console.log($scope.provincedata);
		console.log($scope.months);
		$scope.municipalData = $scope.provincedata[39];
		$scope.notif = "";
		$scope.currentScheme = colorarr;
		console.log($scope.currentScheme);

		var arr = $scope.municipalData.array;
		var newarr = [];
		for(let each of arr){
			var obj = {
				id: each.id,
				value: Math.round(each.value),
				color: each.color,
				textcolor: each.textcolor
			};
			newarr.push(obj);
		}
		console.log(newarr);
		$scope.displayarr = newarr;
		$scope.loadingbar=false;
	}

	$scope.changenotif = function(string){
		$scope.notif = string;
	}

	$scope.onChangedProvince = function(){
		console.log($scope.currentProvince);	
		$scope.municipalData = $scope.provincedata[parseInt($scope.currentProvince.id)]
		$scope.muniArr = $scope.municipalData.municipalities;
	}

	$scope.changeCurrentProvince = function(string){
		$scope.showMunicipality = true;
		$scope.showProvince = false;
		$scope.municipalData = $scope.provincedata[parseInt(string)];
		console.log($scope.municipalData)

		var arr = $scope.municipalData.array;
		var newarr = [];
		for(let each of arr){
			var obj = {
				id: each.id,
				value: Math.round(each.value),
				color: each.color,
				textcolor: each.textcolor
			};
			newarr.push(obj);
		}
		console.log(newarr);
		$scope.displayarr = newarr;
	}

	$scope.changeDisplayArr = function(val){
		
		if(val == "all"){
			console.log("shall i compare thee to a winter's day")
			var arr = $scope.municipalData.array;
			var newarr = [];
			for(let each of arr){
				var obj = {
					id: each.id,
					value: Math.round(each.value),
					color: each.color,
					textcolor: each.textcolor
				};
				newarr.push(obj);
			}
			console.log(newarr);
			$scope.displayarr = newarr;
		}else{
			var muns = $scope.municipalData.municipalities;
			console.log(muns);
			var arr = muns[parseInt(val)].array;
			var newarr = [];
			for(let each of arr){
				var obj = {
					id: each.id,
					value: Math.round(each.value),
					color: each.color,
					textcolor: each.textcolor
				};
				newarr.push(obj);
			}
			console.log(newarr);
			$scope.displayarr = newarr;
		}
	}

	$scope.searchP = false;
	$scope.searchM = false;
	$scope.pKey = "";
	$scope.mKey = "";

	$scope.searchPtoggle = function(){
		if($scope.searchP == false){
			$scope.searchP = true;
		}else{
			$scope.searchP = false
		}
	}

	$scope.searchMtoggle = function(){
		if($scope.searchM == false){
			$scope.searchM = true;
		}else{
			$scope.searchM = false
		}
	}


	$scope.monthForDownload = -1;

	$scope.reColor = function(string){
		if(string == currentScheme.schemename){
			//do nothing, because nothing changes.
		}else{

		}
	}

	$scope.download = function(){
		
	}
}]);

//filter for search if search is implemented
/*
app.filter('inListP', function () {
	return function (items, filterKey) {
		var filtered = [];

		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if (item.province.toLowerCase() == filterKey.toLowerCase()){
		  		filtered.push(item);
			}
		}
		return filtered;
	}
});


app.filter('inListM', function () {
	return function (items, filterKey) {
		var filtered = [];

		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if (item.Municipality.toLowerCase() == filterKey.toLowerCase()){
		  		filtered.push(item);
			}
		}
		return filtered;
	}
});
*/