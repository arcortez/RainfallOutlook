$(window).resize(function() {
 
  svg
    .attr("width", $(".map-holder").width())
    .attr("height", $(".map-holder").height())
  ;
  
});

var svg = d3.selectAll(".map-holder")
  .append("svg")
  // set to the same size as the "map-holder" div
  .attr("width", $(".map-holder").width())
  .attr("height", $(".map-holder").height());
  
var width = $(".map-holder").width();
var height = $(".map-holder").height();
var scale_value = 1700;

var projection = d3
	.geoEquirectangular()
	.center([133, 13]) //the lat-long degrees of the philippines
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

var allMunicipalities = [];
var monthspan = [];
d3.csv("data/Forecast.csv", parseData)
function parseData(data){

	monthspan = data.columns;
	monthspan.shift();
	// console.log(monthspan);

	data.push({Municipality:"end"});

	var currentProvince = provlist.shift();
	var nextProvince = provlist.shift();
	
	var pMuni = [];
	for(let each of data){
		// console.log(currentProvince +" "+ each.Municipality);
		var currProvAsObject;
		var arrayofvalues = [];
		if(each.Municipality == "Abra"){
			currProvAsObject = each;
			continue;
		}

		if(each.Municipality == nextProvince || each.Municipality == "end"){
			var keys = Object.keys(currProvAsObject);
			for(let i=1;i<keys.length;i++){
				var val = currProvAsObject[keys[i]];
				arrayofvalues.push(val)
			}

			allMunicipalities.push({
				province: currentProvince,
				array: arrayofvalues,
				municipalities: pMuni
			});
			pMuni = [];
			currentProvince = nextProvince;
			nextProvince = provlist.shift();
			currProvAsObject = each;
		}else{
			pMuni.push(each);
		}
	}
	// console.log(allMunicipalities)
}

d3.json("data/Provinces.json", drawMaps);
function drawMaps (geojson) {
	var t = 0;
	var provinces = svg.append("g").attr("class", "geo");
	
	provinces
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "white");


	var prov = provinces
		.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("fill", function(d){
			var val = Math.floor((Math.random() * 7) + 1);
			var string = "";

			if(val == 1){
				string = "rgb(255,0,0)";
			}else if(val == 2){
				string = "rgb(255,255,0)";
			}else if(val == 3){
				string = "rgb(0,176,80)";
			}else{
				string = "rgb(68,114,196)";
			}

			return string;
		})
		.attr("id", function(d){
			if(d.properties.ID_1 == 82){
				t++;
			}
			return "PH"+t+"-"+d.properties.ID_1			
		})
		.on("click", function(d){
			console.log(d.properties.ID_1+" "+d.properties.NAME_1)

		})
		.on("mouseover", function(d){
			d3.select("#PH"+t+"-"+d.properties.ID_1).classed("selected", true);
			d3.select("#PL"+t+"-"+d.properties.ID_1).style("display", "block");
		});

	var provincenames = svg.append("g").attr("class", "label");
	var h = 0;

	var provnames = provincenames
		.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("g")
		.attr("class", "provincenames")
      	.attr("transform", function(d) {
        	return (
	          	"translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
        	);
    	});

	provnames
		.attr("id", function(d){
			if(d.properties.ID_1 == 82){
				h++;	
			}
			return "PL"+h+"-"+d.properties.ID_1;
		})
		.append("text")
	    .attr("class", "provlab")
	    .style("text-anchor", "middle")
	    .attr("dx", 0)
	    .attr("dy", 0)
	    .text(function(d) {
	    	// console.log(d)
	    	return d.properties.NAME_1;
	    });

}




