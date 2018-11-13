  
$(window).resize(function() {
 
  svg
    .attr("width", $(".map-holder").width())
    .attr("height", $(".map-holder").height())
  ;
  
}); //for debugging/testing

function getColorVal(num, color_schema){
	if(color_schema == "FOUR"){
		if(num < 100) return "rgb(255,0,0)";
		else if(num >= 100 && num <250) return "rgb(255,255,0)";
		else if(num >=250 && num <=500) return "rgb(0,176,40)";
		else if(num > 500) return "rgb(68,114,198)";
		else console.log('invalid input >> '+num);
	}else if(color_schema == "BLUE"){

		if(num < 100) return "rgb(225,225,225)";
		else if(num >= 100 && num <250) return "rgb(116,220,253)";
		else if(num >=250 && num <=500) return "rgb(9,87,235)";
		else if(num > 500) return "rgb(30,59,180)";
		else console.log('invalid input >> '+num);

		/* //6 shades of blue 
		if(num < 50) return "rgb(225,225,225)";
		else if(num >= 50 && num < 100) return "rgb(185,231,253)";
		else if(num >= 100 && num < 200) return "rgb(16,183, 252)";
		else if(num >= 200 && num < 300) return "rgb(10,109,254)";
		else if(num >= 300 && num < 400) return "rgb(5,76,156)";
		else if(num >= 400 && num <= 500) return "rgb(0,38,118)";
		else return "rgb(0,10,10)";
		*/ 
	}
}

function getTextColor(num, color_schema){
	if(num < 250) return "black";
	else return "white"
}

var svg = d3.selectAll(".map-holder")
  .append("svg")
  .attr("width", $(".map-holder").width())
  .attr("height", $(".map-holder").height());
  
var width = $(".map-holder").width();
var height = $(".map-holder").height();
var scale_value = 500;

var projection = d3
	.geoEquirectangular()
	.center([170, -4]) //the lat-long degrees of the philippines
	.scale(scale_value);

var path = d3
  .geoPath()
  .projection(projection)
;

var provlist = [];
d3.csv("data/Forecast-Provinces.csv", parseProv)
function parseProv(data){
	for(let each of data){
		provlist.push(each.Provinces);
	}

}

var colorschemes = [
	{
		id: 0,
		schemename: 'BLUE', 
		schemedesc: "Shades of Blue",
		array:[
			{
				color: "rgb(225,225,225)",
				desc: "< 100mm",
				// lower_range: 0,
				// upper_range: 100
			},
			{
				color: "rgb(116,220,253)",
				desc: "100-250mm"
			},
			{
				color: "rgb(9,87,235)",
				desc: "250-500mm"
			},
			{
				color: "rgb(30,59,180)",
				desc: "> 500mm"
			}
		] 
	},
	{
		id: 1,
		schemename: 'FOUR', 
		schemedesc: "Four Colors (Red, Yellow, Green, Blue)",
		array:[
			{
				color: "rgb(255,0,0)",
				desc: "< 100mm"
			},
			{
				color: "rgb(255,255,0)",
				desc: "100-250mm"
			},
			{
				color: "rgb(0,176,40)",
				desc: "250-500mm"
			},
			{
				color: "rgb(68,114,198)",
				desc: "> 500mm"
			}
		] 
	}
];

var allMunicipalities = [];
var monthspan = [];
var colorarr;


function parseData(data){
	// console.log(data)

    var scheme = document.getElementById('cschema').value; // <input> in div#schema
    // console.log(scheme);

    if(scheme == 'FOUR'){ //taking from predefined colorarr
    	colorarr = colorschemes[1];
    }else if(scheme == 'BLUE'){
    	colorarr = colorschemes[0];
    }

	monthspan = data.columns; // will be used late in controller.js
	monthspan.shift(); // removes first column header of csv file, uneeded
	console.log(monthspan);

	data.push({Municipality:"end"}); // to mark end of iteration in parsing

	var currentProvince = provlist.shift(); //dequeue
	var nextProvince = provlist.shift();
	
	var provinceCount = 0; // for IDs
	var municipalityCount = 0;

	var pMuni = [];
	for(let each of data){
		var currProvAsObject;
		var arrayofvalues = [];

		var keylist = Object.keys(each);
		var entryString = each[keylist[0]]; // array of objects do not have index, a workaround

		// console.log(each); //checking by sight

		if(entryString == "Abra"){ 
			currProvAsObject = each;
			continue;
		}

		/*
		CSV File Format:
		
		Prov/Muni   Month1 Month2 ...  Month6
		Prov
		Muni
		Muni
		...
		Prov
	
		*/

		if(entryString == nextProvince || entryString == "end"){ // if province is encountered.
			var keys = Object.keys(currProvAsObject);
			for(let i=1;i<keys.length;i++){
				var val = currProvAsObject[keys[i]];
				arrayofvalues.push({
					id: i-1,
					value: val,
					color: getColorVal(val, scheme),
					textcolor: getTextColor(val, scheme)
				});
			}

			allMunicipalities.push({
				id: provinceCount,
				province: currentProvince,
				array: arrayofvalues,
				municipalities: pMuni
			});

			provinceCount++;
			municipalityCount = 0;
			pMuni = [];
			currentProvince = nextProvince;
			nextProvince = provlist.shift();
			currProvAsObject = each;
		}else{
			var name = entryString
			var arr = [];
			var carr = [];

			var keys = Object.keys(each);
			var len = keys.length;
			for(let i=1;i<len;i++){
				var temp = each[keys[i]]
				arr.push({
					id: i-1,
					value: temp,
					color: getColorVal(temp, scheme),
					textcolor: getTextColor(temp, scheme)					
				});
			}
			var obj = {
				id: municipalityCount,
				Municipality: name,
				array: arr
			}
			municipalityCount += 1;
			// console.log(each);
			// console.log(arr);
			pMuni.push(obj);
		}
	}
	// console.log(allMunicipalities)

}



//d3js
function drawMaps (geojson){
	console.log('mapping')
	var t = 0;
	var m = 0;
	var p = 0;
	var provinces = svg.append("g").attr("class", "geo");
	
	provinces
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "white");

	provinces
		.append("text")
		.attr("x", 25)
		.attr("y", 25)
		.attr("fill", "#d0d0d0")
		.attr("style", "opacity: .8;")
		.attr("font-size", "14px")
		.text(function(d){
			var string = monthspan[p].toUpperCase();
			p++;
			console.log(string);
			return string;
		});

	var prov = provinces
		.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("fill", function(d){
			var provnumberID = parseInt(d.properties.ID_1) - 1;
			var colorstring = allMunicipalities[provnumberID].array[m].color	
			if(d.properties.ID_1 == 82){
				m++;
			}
			return colorstring;
		})
		.attr("id", function(d){
			if(d.properties.ID_1 == 82){
				t++;
			}
			// console.log("PH"+t+"-"+d.properties.ID_1);
			return "PH"+t+"-"+d.properties.ID_1			
		})
		.on("click", function(d){
			console.log(d.properties.ID_1+" "+d.properties.NAME_1)

		});
	
	var loaded = angular.element(document.getElementById("fullscale")).scope();
	loaded.$apply(function(){
		loaded.loadProvinceData();
	})
}