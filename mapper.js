// code resource : https://bl.ocks.org/shimizu/raw/61e271a44f9fb832b272417c0bc853a5/
//geojson resource: https://github.com/macoymejia/geojsonph

var projection = d3
	.geoMercator() 
	.scale(2000)	
	.center([130, 15]); 

var path = d3.geoPath().projection(projection);　

var map = d3.select("body")
	.append("svg")
	.attr("width", 400)
	.attr("height", 660);



var selected = "None";
var dataset;
var rgbarr = [];


d3.csv("data/SampleData.csv", dataParse)

function dataParse(data){
	var provincepop = [];
	var provincenames = [];
	var provincearea = [];
	var provincedensity = [];
	var populationarr = [];

	var previous_province = "";
	for(each of data){	
		if(each.Province != previous_province && each.Province != ""){
			provincenames.push(each.Province)
			provincepop.push(0)
			provincearea.push(0)
		}
		previous_province = each.Province;
	}
	for(each of data){
		var ind = provincenames.indexOf(each.Province)
		provincepop[ind] = provincepop[ind] + parseInt(each.Population.replace(",",""))
		provincearea[ind] = provincearea[ind] + parseInt(each.Area.replace(",",""))
	}

	var len = provincenames.length
	var largest_pop = 0;
	var densest = 0;
	for(let i=0;i<len;i++){		
		var denseness = provincepop[i]/provincearea[i];
		provincedensity[i] = denseness - (denseness % 1);

		if(provincepop[i] > largest_pop){
			largest_pop = provincepop[i]
		}

		if( provincedensity[i] > densest ){
			densest = provincedensity[i]
		}

		var obj = {
			province_name: provincenames[i],
			population: provincepop[i],
			area: provincearea[i],
			density: provincedensity[i],
			province_id: "PH-"+(i+1),
			rgbval: 0
		}
		populationarr.push(obj);
	}

	console.log(densest)
	console.log(largest_pop)
	console.log(populationarr);


	for(let i=0;i<len;i++){
		var x = i+1;
		var rgbval = (provincepop[i])/largest_pop;
		rgbval = (rgbval*255) - ((rgbval*255)%1);
		populationarr[i].rgbval = rgbval;
		rgbarr.push(populationarr[i]);
	}

}


d3.json("data/Provinces.json", drawMaps);
function drawMaps(geojson) {
	var t = 0;
	var attr;
	map.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("class", "province")
		.attr("value", "100")
		.attr("style", function(d, i) {
			var val = rgbarr[t].rgbval
			t++;
			return "fill: rgb("+val+","+val+","+val+");"
        })
		.attr("id", function(d, i) {
			
        	return "PH-"+d.properties.ID_1;
        })
		.on('click', function(d, i){
			selected = d.properties.NAME_1
			console.log(selected)
			$("#selectedprovince").text(selected);


		})
		.on("mouseover", function(d, i) {
            $("#provincename").text(d.properties.NAME_1);
        })
        .on("mouseout", function(d, i) {
          	$("#provincename").text("");
        });


}
