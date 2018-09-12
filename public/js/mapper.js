// code resource : https://bl.ocks.org/shimizu/raw/61e271a44f9fb832b272417c0bc853a5/
//geojson resource: https://github.com/macoymejia/geojsonph

var maps = []

for(let k=0;k<5;k++) {
	var selected = "None";
	var dataset;
	var rgbarr = [];

	var projection = d3
		.geoMercator() 
		.scale(1400)	
		.center([136, 12]); 

	var path = d3.geoPath().projection(projection);　

	var map = d3.select("body")
		.append("svg")
		.attr("width", 290)
		.attr("height", 470)
		.attr("max-width", 290)
		.attr("max-height", 470);

	maps.push(map);

	d3.json("data/Provinces.json", drawMaps);

	function drawMaps(geojson) {
		var t = 0;
		var attr;
		maps[k].selectAll("path")
			.data(geojson.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("class", "province")
			.attr("value", "100")
			.attr("style", function(d, i) {
				var val1 = (Math.random() * 256);
				var val2 = (Math.random() * 256);
				var val3 = (Math.random() * 256);
				t++;
				return "fill: rgb("+val1+","+val2+","+val3+");"
	        })
			.attr("id", function(d, i) {
				
	        	return "PH"+ k +"-"+d.properties.ID_1;
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

}
