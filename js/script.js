$(window).load(function() {
	$( "#accordion").accordion({heightStyle: 'panel'});
	$( "#tabs" ).tabs();
    $( "#check" ).button();
    $( "#format" ).buttonset();
	$( "#tooltip" ).tooltip();

});

jQuery(document).ready(function($) {

	// bjqs slider
  $('#banner-slide').bjqs({
    animtype      : 'slide',
    height        : 200,
    width         : 300,
    responsive    : true,
    randomstart   : false,

	animtype        : 'fade',
	animduration    : 350,      // length of transition
	animspeed       : 10000,     // delay between transitions
	automatic       : true,     // enable/disable automatic slide rotation

	
	// control and marker configuration
	showcontrols    : true,     // enable/disable next + previous UI elements
	centercontrols  : true,     // vertically center controls
	nexttext        : '>>',   // text/html inside next UI element
	prevtext        : '<<',   // text/html inside previous UI element
	showmarkers     : true,     // enable/disable individual slide UI markers
	centermarkers   : true,     // horizontally center markers

	});
});
 
/////////////////
// FUNCTIONS
/////////////////

// add commas to numbers > 1000
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}	

// round to two hundredths
function roundToTwo(value) {
	return(Math.round(value * 100) / 100);
}

// draw bar chart
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawBarChart);

function drawBarChart(buildBar, arr1, arr2, arr3, arr4, arr5) {
var data = google.visualization.arrayToDataTable([
['Variable Rank', '1', '2', '3', '4', '5'],
['Waves',   arr1[0]/4, arr2[0]/4, arr3[0]/4, arr4[0]/4, arr5[0]/4],
['Elevation',   arr1[1]/4, arr2[1]/4, arr3[1]/4, arr4[1]/4, arr5[1]/4],
['Surge',  arr1[2]/4, arr2[2]/4, arr3[2]/4, arr4[2]/4, arr5[2]/4],
['Geomph',  arr1[3]/4, arr2[3]/4, arr3[3]/4, arr4[3]/4, arr5[3]/4],
['SLR',  arr1[4]/4, arr2[4]/4, arr3[4]/4, arr4[4]/4, arr5[4]/4],
['Habitats',  arr1[5]/4, arr2[5]/4, arr3[5]/4, arr4[5]/4, arr5[5]/4],
]);

var options = {
title: 'Variable Ranks',
colors: ['#f0f0f0', '#f0f0f0', '#d9d9d9', '#525252', '#000'],
is3D:true,
isStacked: true,
};

var chart = new google.visualization.BarChart(buildBar);
chart.draw(data, options);

}
		

// Leaflet popup
function popup(lat, lon, type){
	var popup = L.popup()
	.setLatLng([lat, lon])
	.setContent('your selection')
	.openOn(map);
	} 	

// intersect Leaflet draw and write table
function updateLayer(query, layer){
	// switch to last tab
	$("#tabs").tabs({ active: 1}); 
	
	var ck_HH = document.getElementById('radio-1c');
	var ck_CH = document.getElementById('radio-2c');
	var ck_NH = document.getElementById('radio-3c');	
	
	var ck_NR = document.getElementById('radio-1d');
	var ck_MD = document.getElementById('radio-2d');
	var ck_LG = document.getElementById('radio-3d');
	
	// run a query to select portions of a layer
	var sql = cartodb.SQL({ user: 'gverutes' });

	sql.execute("SELECT * FROM ("+query+") a").done(function(data) {
	var arr1 = [4, 4, 4, 4, 4, 4];
	var arr2 = [4, 4, 4, 4, 4, 4];
	var arr3 = [4, 4, 4, 4, 4, 4];
	var arr4 = [4, 4, 4, 4, 4, 4];
	var arr5 = [4, 4, 4, 4, 4, 4];
	var cvi_ch = [];
	var cvi_nh = [];
	
	for (var i = 0; i < data.total_rows; i++) {
		
		switch(data.rows[i].wave_expos) {
			case (3):
				arr3[0] = arr3[0] + 1;
				break;
			case (4):
				arr4[0] = arr4[0] + 1;
				break;
			case (5):
				arr5[0] = arr5[0] + 1;
				break;
			case (2):
				arr2[0] = arr2[0] + 1;
				break;
			case (1):
				arr1[0] = arr1[0] + 1;
				break;
		}
		
		switch(data.rows[i].relief) {
			case (3):
				arr3[1] = arr3[1] + 1;
				break;
			case (4):
				arr4[1] = arr4[1] + 1;
				break;
			case (5):
				arr5[1] = arr5[1] + 1;
				break;
			case (2):
				arr2[1] = arr2[1] + 1;
				break;
			case (1):
				arr1[1] = arr1[1] + 1;
				break;
		}
	
		switch(data.rows[i].surge_pot) {
			case (3):
				arr3[2] = arr3[2] + 1;
				break;
			case (4):
				arr4[2] = arr4[2] + 1;
				break;
			case (5):
				arr5[2] = arr5[2] + 1;
				break;
			case (2):
				arr2[2] = arr2[2] + 1;
				break;
			case (1):
				arr1[2] = arr1[2] + 1;
				break;
		}

		switch(data.rows[i].geomorph) {
			case (3):
				arr3[3] = arr3[3] + 1;
				break;
			case (4):
				arr4[3] = arr4[3] + 1;
				break;
			case (5):
				arr5[3] = arr5[3] + 1;
				break;
			case (2):
				arr2[3] = arr2[3] + 1;
				break;
			case (1):
				arr1[3] = arr1[3] + 1;
				break;
		}	

		// do a test for value of check box
		if (ck_LG.checked){
			arr4[4] = arr4[4] + 1;
		}
		else if (ck_MD.checked){
			arr2[4] = arr2[4] + 1;		
		}
		else {arr1[4] = arr1[4] + 1;}

		
		// do a test for value of check box
		if (ck_HH.checked){
				if (data.rows[i].hrank == 5){
				arr5[5] = arr5[5] + 1;
				}
				else {arr2[5] = arr2[5] + 1;}
		}
		else if (ck_CH.checked){
				if (data.rows[i].hrank_cur == 5){
				arr5[5] = arr5[5] + 1;
				}	
				else {arr2[5] = arr2[5] + 1;}		
		}
		else if (ck_NH.checked){
				if (data.rows[i].hrank_none == 5){
				arr5[5] = arr1[5] + 1;
				}
				else {arr2[5] = arr2[5] + 1;}				
		}
		
		if (data.rows[i].cvi_nr_ch1 > 2.90419) {cvi_ch.push(data.rows[i].t_pop_14);}
		if (data.rows[i].cvi_md_nh1 > 2.90419) {cvi_nh.push(data.rows[i].t_pop_14);}	
	}
	
	var sum_cvi_ch = 0;
	var sum_cvi_nh = 0;
	for ( var i = 0; i < cvi_ch.length; i++ ){ sum_cvi_ch += cvi_ch[i]; }
	for ( var i = 0; i < cvi_nh.length; i++ ){ sum_cvi_nh += cvi_nh[i]; }		
	
	drawBarChart(document.getElementById('chartBar_div'), arr1, arr2, arr3, arr4, arr5);
	var pop_summary = "<center><b>"+numberWithCommas(Math.round(sum_cvi_nh - sum_cvi_ch))+" people</b> at reduced risk due to natural habitats.</center>";
	document.getElementById("AOISummary").innerHTML = pop_summary;
	});
}


// basemaps
var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, and UPR-EGP'
});
var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMaps</a>'});
var MapboxStreets = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.afb8c76d/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
var MapboxTerrain = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.e4qjes5f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw', {attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>'});
var OceanESRI = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'
});

// map settings
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw';

var admin = L.mapbox.tileLayer('geointerest.UAE_Infrust');
var labels = L.mapbox.tileLayer('geointerest.UAE_Labels');
var ImageryOverlay = L.layerGroup([ESRIImagery, admin, labels]);
var TerrainOverlay = L.layerGroup([MapboxTerrain, labels]);	
	
// set base map and controls
var map = new L.Map('map', {
  zoomControl: false,
  layer_selector: true,
  layers: [TerrainOverlay],
  center: [24.5, 56.3],
  zoom: 7,
  minZoom: 7,
  maxZoom: 16
});

// zoom control
map.addControl( L.control.zoom({position: 'topleft'}) )
// scale
L.control.scale({ position: 'topleft' }).addTo(map);

// draw control (Leaflet)
L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a polygon';
	var drawControl = new L.Control.Draw({
		position: 'topright',
		draw: {
			polyline: false,
			polygon:false,
			rectangle: {
            shapeOptions: {
				color: '#fff',
                clickable: false,
				opacity: 0.1,
            }
        },
			circle: false,
			marker: false
		}
	});
	
map.addControl(drawControl);		
map.attributionControl.setPrefix('Mapping portal by <a href="mailto:gverutes@gmail.com" target="_top">Gregg Verutes</a>');
	
// add basemap and overlays
var baseMaps = {
	"terrain": TerrainOverlay,
	"imagery": ImageryOverlay,
	"streets": MapboxStreets
};

// intersect CV_250m with LeafletDraw
cartodb.createLayer(map, 'https://stanford.carto.com/u/gverutes/api/v2/viz/ebcf7940-8798-4f12-a570-29ae90a74a83/viz.json')
	.on('done', function(layer) {
	layer.setZIndex(13);	
	// keep track of all draw objects
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	// set the title to show on the polygon button
	map.on('draw:created', function (e) {
	var type = e.layerType,
	draw_layer = e.layer;

	// show the polygon on the map
	drawnItems.addLayer(draw_layer);

	// get the coordinates of the polygon we just drew
	var poly = draw_layer.getLatLngs();
	var sql_poly = [];
	for (i in poly){
		sql_poly.push("CDB_LatLng("+poly[i].lat+","+poly[i].lng+")")
		}
		// SQL polygon must be a CLOSED loop
		sql_poly.push("CDB_LatLng("+poly[0].lat+","+poly[0].lng+")")

		// join drawn coordinates and a SQL query
		var query = "SELECT * FROM cv_250m_line WHERE ST_Intersects(the_geom, ST_MakePolygon(ST_MakeLine(Array["+sql_poly.join()+"])))";
		
		// run function to update SQL and Style
		updateLayer(query, layer.getSubLayer(0))
	});
})
        .on('error', function(err) {
          alert("some error occurred: " + err);
        });
	
// street view	
 var streetIcon = L.Icon.Default.extend({
	options: {
			iconUrl: 'img/marker-icon-blue.png' ,
			iconSize:     [20, 20],  // size of the icon
			iconAnchor:   [9, 19],
			popupAnchor:  [-2, -12]  			
	}
 });
 
var streetIcon = new streetIcon();
streetIcon.options.shadowSize = [0,0];

var string1 = "<center><b>Instant Street View</b><a href=\'http://www.instantstreetview.com/s/"
var string2 = "&mode=sequential\' target=\'_blank\'><br>CLICK TO LAUNCH</a></center>"
var SV1 = L.marker([23.96103, 52.177928], {icon: streetIcon}).bindPopup(string1+"23.96103,52.177928"+string2);
var SV2 = L.marker([24.214156, 52.590491], {icon: streetIcon}).bindPopup(string1+"24.214156,52.590491"+string2);
var SV3 = L.marker([24.102255, 53.487213], {icon: streetIcon}).bindPopup(string1+"24.102255,53.487213"+string2);
var SV4 = L.marker([24.468899, 54.311817], {icon: streetIcon}).bindPopup(string1+"24.468899,54.311817"+string2);
var SV5 = L.marker([25.097809, 55.131465], {icon: streetIcon}).bindPopup(string1+"25.097809,55.131465"+string2);
var SV6 = L.marker([25.226773, 55.17918], {icon: streetIcon}).bindPopup(string1+"25.226773,55.17918"+string2);
var SV7 = L.marker([25.327792, 55.351602], {icon: streetIcon}).bindPopup(string1+"25.327792, 55.351602"+string2);
var SV8 = L.marker([25.405962, 55.429194], {icon: streetIcon}).bindPopup(string1+"25.405962,55.429194"+string2);
var SV9 = L.marker([25.588623, 55.65374], {icon: streetIcon}).bindPopup(string1+"25.588623,55.65374"+string2);
var SV10 = L.marker([25.726649, 55.845761], {icon: streetIcon}).bindPopup(string1+"25.726649,55.845761"+string2);
var SV11 = L.marker([25.892348, 56.029592], {icon: streetIcon}).bindPopup(string1+"25.892348,56.029592"+string2);
var SV12 = L.marker([25.027891, 56.365811], {icon: streetIcon}).bindPopup(string1+"25.027891,56.365811"+string2);
var SV13 = L.marker([25.117533, 56.357337], {icon: streetIcon}).bindPopup(string1+"25.117533,56.357337"+string2);
var SV14 = L.marker([25.288618, 56.372083], {icon: streetIcon}).bindPopup(string1+"25.288618,56.372083"+string2);
var SV15 = L.marker([25.358364, 56.350138], {icon: streetIcon}).bindPopup(string1+"25.358364,56.350138"+string2);
var SV16 = L.marker([25.601261, 56.33981], {icon: streetIcon}).bindPopup(string1+"25.601261,56.33981"+string2);

// grab MapBox tiles
var polyPAs = L.mapbox.tileLayer('geointerest.UAE_PAs');	
var population = L.mapbox.tileLayer('geointerest.UAE_Population');

// add CartoDB viz.json
var layerUrlCV = 'https://stanford.carto.com/u/gverutes/api/v2/viz/ebcf7940-8798-4f12-a570-29ae90a74a83/viz.json'; 
var habitats = 'https://stanford.carto.com/u/jesssilver/api/v2/viz/92e8276e-6159-4bd6-9b04-ccfe97407f6f/viz.json';
var ecoAssets = 'https://stanford.carto.com/u/gverutes/api/v2/viz/9821c780-c2fd-11e6-8df0-0e3ebc282e83/viz.json';
var infrast = 'https://stanford.carto.com/u/gverutes/api/v2/viz/1c62b03e-c2e7-11e6-b5a3-0e05a8b3e3d7/viz.json';
var habLoss = 'https://stanford.carto.com/u/gverutes/api/v2/viz/02a4a95c-c307-11e6-99d4-0e233c30368f/viz.json';


// set hover colors
function highlightFeature(e) {
	var layer = e.target;
	layer.setStyle({
		color: "#000",
		weight: 3,
		opacity: 0.7
	});
}

// set base style of grid
function style(feature) {
  return {
	weight: 0,
	fillOpacity: 0,
	fillColor: '#31a354',
	color: 'fff'
  };
}

// set hover colors
function highlightFeature(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 9,
		opacity: 0.45,
		color: '#ffff99', 
		dashArray: '3',
		fillOpacity: 0.2,
		fillColor: '#fff'
	});
}

// a function to reset the colors when a neighborhood is not longer 'hovered'
function resetHighlight(e) {
	geojson.resetStyle(e.target);
}

// tell MapBox.js what functions to call when mousing over and out of a neighborhood
// add vector data to map
var geojson = L.geoJson(coastalPAs, {
	style: style,
	onEachFeature: function (feature, layer) {
	layer.on({
	mouseover: highlightFeature,
	mouseout: resetHighlight
	});
		layer.bindPopup("Name: <b>"+feature.properties.Name+"<br></b>Status: <b>"+feature.properties.STATUS+"</b>");
	  }
	});

	
function openMarkerPopup(id){
	geojson.eachLayer(function(feature){
		if(feature.feature.properties.id==id){
			feature.openPopup();
		}
	});
}    
map.closePopup();


// combine Leaflet geojson from QGIS with tiles from Mapbox
var conserv = L.layerGroup([polyPAs, geojson]);
var streets = L.layerGroup([SV1, SV2, SV3, SV4, SV5, SV6, SV7, SV8, SV9, SV10, SV11, SV12, SV13, SV14, SV15, SV16]);

// add cartoDB layer and set z-index so it shows up on top
	cartodb.createLayer(map, habitats)
	.on('done', function(layer) {
		layer.setZIndex(9);
		population.setZIndex(13);
		conserv.setZIndex(15);
		streets.setZIndex(16);
		var overlayMaps = {	 
		"conservation": conserv.addTo(map),		
		"natural habitats": layer,
		"coastal population": population.addTo(map),
		"instant street view": streets.addTo(map),
		};
		L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed: false}).addTo(map);
	});

// mini map
	// overlay detailed urban place names on locator map using Mapbox Studio
	var CartoLight = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
  	//var mapboxUrl='http://a.tiles.mapbox.com/v3/mapbox.world-light/{z}/{x}/{y}.png';
	var mb = new L.TileLayer(CartoLight, {minZoom: 4, maxZoom: 16});
	var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true }).addTo(map);   

/*	
// control that shows state info on hover
	var info = L.control({position: 'bottomright'});

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	// method that we will use to update the control based on feature           properties passed
	info.update = function (props) {
		this._div.innerHTML = "<img src='img/Legend_NatHab.png'>";
	};

	info.addTo(map);		
*/
 
///////////////////////////////////////////////////////////////////////////////////////////////////	

var sql = cartodb.SQL({ user: 'gverutes' });
	
var endCVI = 0;  
var sublayersCVI = [];

// CVI
function clearHazard(){

	if (endCVI > 0){sublayersCVI[endCVI-1].remove();}
	endCVI = endCVI + 1;
	
	var MapQueryCVI = "SELECT * FROM cv_250m_line";
		
	var CartoCSSCVI = "#cv_250m_line{line-color: #0080ff;line-width: 0;line-opacity: 0;}";
	document.getElementById("HazardLegend").innerHTML = "";	
	
	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryCVI,
		  cartocss: CartoCSSCVI,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersCVI.push(sublayer);
		layer.setZIndex(20);
	  }).on('error', function() {
		// log the error
	  });
}


function showHazard(){

	if (endCVI > 0){sublayersCVI[endCVI-1].remove();}
	
	var HTML1 = "";
	HTML1 = HTML1 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_1.png'></fieldset>";	
	var HTML2 = "";
	HTML2 = HTML2 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_2.png'></fieldset>";
	var HTML3a = "";
	HTML3a = HTML3a + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_3a.png'></fieldset>";
	var HTML3b = "";
	HTML3b = HTML3b + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_3b.png'></fieldset>";
	var HTML3c = "";
	HTML3c = HTML3c + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_3c.png'></fieldset>";

	endCVI = endCVI + 1;
	
	var MapQueryCVI = "SELECT * FROM cv_250m_line";
	var ck_zoomScale = document.getElementById('radio-2e');
	
	if ($( "#scale option:selected" ).text() == 'Abu Dhabi & offshore islands'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Abu Dhabi'";
		if(ck_zoomScale.checked){map.setView([24.1, 54.3], 8);}
	}
	else if ($( "#scale option:selected" ).text()	== 'Dubai'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Dubai'";
		if(ck_zoomScale.checked){map.setView([25.2, 55.4], 10);}
	}
	else if ($( "#scale option:selected" ).text()	== 'Sharjah'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Sharjah'";
		if(ck_zoomScale.checked){map.setView([25.45, 56.15], 10);}
	}
	else if ($( "#scale option:selected" ).text()	== 'Ajman'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Ajman'";
		if(ck_zoomScale.checked){map.setView([25.43, 55.5], 12);}
	}
	else if ($( "#scale option:selected" ).text()	== 'Umm Al Quwain'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Umm Al Quwain'";
		if(ck_zoomScale.checked){map.setView([25.6, 55.75], 11);}
	}		
	else if ($( "#scale option:selected" ).text()	== 'Ras Al Khaimah'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Ras Al Khaimah'";
		if(ck_zoomScale.checked){map.setView([25.85, 56.05], 11);}
	}		
	else if ($( "#scale option:selected" ).text()	== 'Fujairah'){
		MapQueryCVI = MapQueryCVI + " WHERE emirate = 'Fujairah'";
		if(ck_zoomScale.checked){map.setView([25.3, 56.65], 10);}
	}
	else{if(ck_zoomScale.checked){map.setView([24.5, 56.3], 7);}}

	var ck_SLR1 = document.getElementById('radio-1b');
	var ck_SLR2 = document.getElementById('radio-2b');
	var ck_SLR3 = document.getElementById('radio-3b');
	var ck_CH = document.getElementById('radio-3b');
	var ck_Map1 = document.getElementById('radio-1c');
	var ck_Map2 = document.getElementById('radio-2c');
	var ck_Map3 = document.getElementById('radio-3c');

	var CartoCSSCVI = "#cv_250m_line{line-color: #000;line-width: 2;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}[zoom=8]{line-width: 3;}[zoom=9]{line-width: 3;}[zoom=10]{line-width: 5;}[zoom=11]{line-width: 5;}[zoom=12]{line-width: 7;}[zoom=13]{line-width: 7;}[zoom=14]{line-width: 8;}[zoom=15]{line-width: 8;}[zoom=16]{line-width: 10;}";
	
	// SCALE NATIONAL
	if ($( "#scale option:selected" ).text() == 'National'){
		// SLR 2020
		if (ck_SLR1.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_nr_ch1 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_nr_ch1 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_nr_ch1 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_nr_ch1 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_nr_ch1 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_nr_nh1 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_nr_nh1 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_nr_nh1 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_nr_nh1 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_nr_nh1 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hrol_nr_1 <= 5]{line-color: #d95f0e;}#cv_250m_line [hrol_nr_1 <= 0.569160]{line-color: #fe9929;}#cv_250m_line [hrol_nr_1 <= 0.450290]{line-color: #fed98e;}#cv_250m_line [hrol_nr_1 = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'mangroves'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [mgrol_nr_1 > 0.245720]{line-color: #fe9929;}#cv_250m_line [mgrol_nr_1 <= 0.245720]{line-color: #fed98e;}#cv_250m_line [mgrol_nr_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'corals'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [crol_nr_1 > 0.221910]{line-color: #fe9929;}#cv_250m_line [crol_nr_1 <= 0.221910]{line-color: #fed98e;}#cv_250m_line [crol_nr_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
				else if ($( "#hab-role option:selected" ).text() == 'marshes'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [msrol_nr_1 > 0.094140]{line-color: #fe9929;}#cv_250m_line [msrol_nr_1 <= 0.094140]{line-color: #fed98e;}#cv_250m_line [msrol_nr_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3c;
				}
			}
		}
			
		// SLR 2050
		else if (ck_SLR2.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_md_ch1 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_md_ch1 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_md_ch1 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_md_ch1 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_md_ch1 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_md_nh1 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_md_nh1 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_md_nh1 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_md_nh1 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_md_nh1 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hrol_md_1 <= 5]{line-color: #d95f0e;}#cv_250m_line [hrol_md_1 <= 0.569160]{line-color: #fe9929;}#cv_250m_line [hrol_md_1 <= 0.450290]{line-color: #fed98e;}#cv_250m_line [hrol_md_1 = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'mangroves'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [mgrol_md_1 > 0.245720]{line-color: #fe9929;}#cv_250m_line [mgrol_md_1 <= 0.245720]{line-color: #fed98e;}#cv_250m_line [mgrol_md_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'corals'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [crol_md_1 > 0.221910]{line-color: #fe9929;}#cv_250m_line [crol_md_1 <= 0.221910]{line-color: #fed98e;}#cv_250m_line [crol_md_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
				else if ($( "#hab-role option:selected" ).text() == 'marshes'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [msrol_md_1 > 0.094140]{line-color: #fe9929;}#cv_250m_line [msrol_md_1 <= 0.094140]{line-color: #fed98e;}#cv_250m_line [msrol_md_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3c;
				}
			}
		}

		// SLR 2100
		else if (ck_SLR3.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_lg_ch1 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_lg_ch1 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_lg_ch1 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_lg_ch1 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_lg_ch1 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_lg_nh1 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_lg_nh1 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_lg_nh1 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_lg_nh1 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_lg_nh1 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hrol_lg_1 <= 5]{line-color: #d95f0e;}#cv_250m_line [hrol_lg_1 <= 0.569160]{line-color: #fe9929;}#cv_250m_line [hrol_lg_1 <= 0.450290]{line-color: #fed98e;}#cv_250m_line [hrol_lg_1 = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'mangroves'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [mgrol_lg_1 > 0.245720]{line-color: #fe9929;}#cv_250m_line [mgrol_lg_1 <= 0.245720]{line-color: #fed98e;}#cv_250m_line [mgrol_lg_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'corals'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [crol_lg_1 > 0.221910]{line-color: #fe9929;}#cv_250m_line [crol_lg_1 <= 0.221910]{line-color: #fed98e;}#cv_250m_line [crol_lg_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
				else if ($( "#hab-role option:selected" ).text() == 'marshes'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [msrol_lg_1 > 0.094140]{line-color: #fe9929;}#cv_250m_line [msrol_lg_1 <= 0.094140]{line-color: #fed98e;}#cv_250m_line [msrol_lg_1 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3c;
				}
			}
		}
	}
	
	// SCALE EMIRATE LEVEL
	else{
		// SLR 2020
		if (ck_SLR1.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_nr_ch2 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_nr_ch2 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_nr_ch2 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_nr_ch2 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_nr_ch2 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_nr_nh2 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_nr_nh2 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_nr_nh2 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_nr_nh2 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_nr_nh2 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;	
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hrol_nr_2 <= 5]{line-color: #d95f0e;}#cv_250m_line [hrol_nr_2 <= 0.569160]{line-color: #fe9929;}#cv_250m_line [hrol_nr_2 <= 0.450290]{line-color: #fed98e;}#cv_250m_line [hrol_nr_2 = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'mangroves'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [mgrol_nr_2 > 0.245720]{line-color: #fe9929;}#cv_250m_line [mgrol_nr_2 <= 0.245720]{line-color: #fed98e;}#cv_250m_line [mgrol_nr_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'corals'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [crol_nr_2 > 0.221910]{line-color: #fe9929;}#cv_250m_line [crol_nr_2 <= 0.221910]{line-color: #fed98e;}#cv_250m_line [crol_nr_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
				else if ($( "#hab-role option:selected" ).text() == 'marshes'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [msrol_nr_2 > 0.094140]{line-color: #fe9929;}#cv_250m_line [msrol_nr_2 <= 0.094140]{line-color: #fed98e;}#cv_250m_line [msrol_nr_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3c;
				}
			}
		}
			
		// SLR 2050
		else if (ck_SLR2.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_md_ch2 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_md_ch2 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_md_ch2 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_md_ch2 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_md_ch2 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_md_nh2 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_md_nh2 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_md_nh2 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_md_nh2 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_md_nh2 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hrol_md_2 <= 5]{line-color: #d95f0e;}#cv_250m_line [hrol_md_2 <= 0.569160]{line-color: #fe9929;}#cv_250m_line [hrol_md_2 <= 0.450290]{line-color: #fed98e;}#cv_250m_line [hrol_md_2 = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'mangroves'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [mgrol_md_2 > 0.245720]{line-color: #fe9929;}#cv_250m_line [mgrol_md_2 <= 0.245720]{line-color: #fed98e;}#cv_250m_line [mgrol_md_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'corals'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [crol_md_2 > 0.221910]{line-color: #fe9929;}#cv_250m_line [crol_md_2 <= 0.221910]{line-color: #fed98e;}#cv_250m_line [crol_md_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
				else if ($( "#hab-role option:selected" ).text() == 'marshes'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [msrol_md_2 > 0.094140]{line-color: #fe9929;}#cv_250m_line [msrol_md_2 <= 0.094140]{line-color: #fed98e;}#cv_250m_line [msrol_md_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3c;
				}
			}
		}

		// SLR 2100
		else if (ck_SLR3.checked){
			if(ck_Map1.checked){
				if ($( "#CVI option:selected" ).text() == 'with'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_lg_ch2 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_lg_ch2 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_lg_ch2 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_lg_ch2 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_lg_ch2 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
				else{
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [ cvi_lg_nh2 <= 5] {line-color: #C00000;}#cv_250m_line [ cvi_lg_nh2 <= 3.2598400115966797] {line-color: #de2d26;}#cv_250m_line [ cvi_lg_nh2 <= 2.9041900634765625] {line-color: #FFCC00;}#cv_250m_line [ cvi_lg_nh2 <= 2.5873401165008545] {line-color: #ffff00;}#cv_250m_line [ cvi_lg_nh2 <= 2.3201799392700195] {line-color: #528FD4;}";
					document.getElementById("HazardLegend").innerHTML = HTML1;
				}
			}
			// ROLE ALL
			else if(ck_Map2.checked){
				CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [hrol_lg_2 <= 5]{line-color: #d95f0e;}#cv_250m_line [hrol_lg_2 <= 0.569160]{line-color: #fe9929;}#cv_250m_line [hrol_lg_2 <= 0.450290]{line-color: #fed98e;}#cv_250m_line [hrol_lg_2 = 0]{line-color: #ffffd4;}";
				document.getElementById("HazardLegend").innerHTML = HTML2;	
			}
			// ROLE INDIVIDUAL
			else {
				if ($( "#hab-role option:selected" ).text() == 'mangroves'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [mgrol_lg_2 > 0.245720]{line-color: #fe9929;}#cv_250m_line [mgrol_lg_2 <= 0.245720]{line-color: #fed98e;}#cv_250m_line [mgrol_lg_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3a;
				}
				else if ($( "#hab-role option:selected" ).text() == 'corals'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [crol_lg_2 > 0.221910]{line-color: #fe9929;}#cv_250m_line [crol_lg_2 <= 0.221910]{line-color: #fed98e;}#cv_250m_line [crol_lg_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3b;
				}
				else if ($( "#hab-role option:selected" ).text() == 'marshes'){
					CartoCSSCVI = CartoCSSCVI + "#cv_250m_line [msrol_lg_2 > 0.094140]{line-color: #fe9929;}#cv_250m_line [msrol_lg_2 <= 0.094140]{line-color: #fed98e;}#cv_250m_line [msrol_lg_2 = 0]{line-color: #ffffd4;}";
					document.getElementById("HazardLegend").innerHTML = HTML3c;
				}
			}
		}
	}

	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryCVI,
		  cartocss: CartoCSSCVI,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersCVI.push(sublayer);
		population.setZIndex(13);		
		layer.setZIndex(14);
		conserv.setZIndex(15);
	  }).on('error', function() {
		// log the error
	  });  
}

////////////////////////////////////////////////////////////////////////////////////////////////
// DRIVERS / VARIABLE RANKS
////////////////////////////////////////////////////////////////////////////////////////////////

var endVR = 0;  
var endHL = 0;
var sublayersVR = [];
var sublayersHL = [];

function clearDrivers(){
	
	//////////////////////////
	// variable ranks
	//////////////////////////		
	
	if (endVR > 0){
		sublayersVR[endVR-1].remove();
	}	
	endVR = endVR + 1;
	
	var MapQueryVR = "SELECT * FROM cv_250m_line";
	var CartoCSSVR = "#cv_250m_line{line-color: #f0f0f0;line-width: 0;line-opacity: 0;}";	
	
	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryVR,
		  cartocss: CartoCSSVR,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersVR.push(sublayer);
		layer.setZIndex(14);
	  }).on('error', function() {
		// log the error
	  });
	  
	//////////////////////////
	// hab loss
	//////////////////////////

	if (endHL > 0){
		sublayersHL[endHL-1].remove();
	}	
	endHL = endHL + 1;
	
	var MapQueryHL = "SELECT * FROM hab_loss_merge5";	
	var CartoCSSHL = "#hab_loss_merge5{polygon-fill: #f33;polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}";	
		cartodb.createLayer(map, habLoss)
		  .addTo(map)
		  .on('done', function(layer) {
			// change the query for the first layer
			var subLayerOptions = {
			  sql: MapQueryHL,
			  cartocss: CartoCSSHL,
			}
			var sublayer = layer.getSubLayer(0);
			sublayer.set(subLayerOptions);
			sublayersHL.push(sublayer);
			//population.setZIndex(13);		
			layer.setZIndex(14);
			//conserv.setZIndex(15);
			//infrast.setZIndex(16);
		  }).on('error', function() {
			// log the error
		  });	  
}


function showDrivers(){

	//////////////////////////
	// variable ranks
	//////////////////////////
	
	if (endVR > 0){
		sublayersVR[endVR-1].remove();
	}
	endVR = endVR + 1;	
	
	var MapQueryVR = "SELECT * FROM cv_250m_line";
	var CartoCSSVR = "#cv_250m_line{line-color: #fff;line-width: 2;line-opacity: 1;line-join:round;line-cap: round;line-smooth:0.25;}[zoom=8]{line-width: 3;}[zoom=9]{line-width: 3;}[zoom=10]{line-width: 5;}[zoom=11]{line-width: 5;}[zoom=12]{line-width: 7;}[zoom=13]{line-width: 7;}[zoom=14]{line-width: 8;}[zoom=15]{line-width: 8;}[zoom=16]{line-width: 10;}";

	/*	
	[5]{marker-fill: #000;}  0,0,0
	[4]{marker-fill: #525252;}  82,82,82
	[3]{marker-fill: #d9d9d9;}  217,217,217
	[<3]{marker-fill: #f0f0f0;} 
	*/

	var ck_wave = document.getElementById('radio-1d');
	var ck_elevation = document.getElementById('radio-2d');
	var ck_surge = document.getElementById('radio-3d');
	var ck_geomorph = document.getElementById('radio-4d');
	var ck_climate = document.getElementById('radio-5d');
	var ck_habitats = document.getElementById('radio-6d');
	var ck_SLR1 = document.getElementById('radio-1b');
	var ck_SLR2 = document.getElementById('radio-2b');
	var ck_SLR3 = document.getElementById('radio-3b');
	
	if ($( "#scale option:selected" ).text() == 'Abu Dhabi & islands'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Abu Dhabi'";
	}
	else if ($( "#scale option:selected" ).text()	== 'Dubai'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Dubai'";
	}
	else if ($( "#scale option:selected" ).text()	== 'Sharjah'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Sharjah'";
	}
	else if ($( "#scale option:selected" ).text()	== 'Ajman'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Ajman'";
	}
	else if ($( "#scale option:selected" ).text()	== 'Umm Al Quwain'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Umm Al Quwain'";
	}		
	else if ($( "#scale option:selected" ).text()	== 'Ras Al Khaimah'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Ras Al Khaimah'";
	}		
	else if ($( "#scale option:selected" ).text()	== 'Fujairah'){
		MapQueryVR = MapQueryVR + " WHERE emirate = 'Fujairah'";
	}
	
	// SCALE NATIONAL
	if ($( "#scale option:selected" ).text() == 'National'){	
		if (ck_wave.checked)
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line [wave_expos = 5]{line-color: #000;}#cv_250m_line [wave_expos = 4]{line-color: #525252;}#cv_250m_line [wave_expos = 3]{line-color: #d9d9d9;}";}		
		
		else if (ck_elevation.checked)
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line [relief = 5]{line-color: #000;}#cv_250m_line [relief = 4]{line-color: #525252;}#cv_250m_line [relief = 3]{line-color: #d9d9d9;}";}	
		
		else if (ck_surge.checked)
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line [surge_pot = 5]{line-color: #000;}#cv_250m_line [surge_pot = 4]{line-color: #525252;}#cv_250m_line [surge_pot = 3]{line-color: #d9d9d9;}";}	
	}
	// SCALE EMIMRATE-LEVEL
	else{
		if (ck_wave.checked)
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line [wave_exp2 = 5]{line-color: #000;}#cv_250m_line [wave_exp2 = 4]{line-color: #525252;}#cv_250m_line [wave_exp2 = 3]{line-color: #d9d9d9;}";}		
		
		else if (ck_elevation.checked)
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line [relief2 = 5]{line-color: #000;}#cv_250m_line [relief2 = 4]{line-color: #525252;}#cv_250m_line [relief2 = 3]{line-color: #d9d9d9;}";}	
		
		else if (ck_surge.checked)
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line [surge_po2 = 5]{line-color: #000;}#cv_250m_line [surge_po2 = 4]{line-color: #525252;}#cv_250m_line [surge_po2 = 3]{line-color: #d9d9d9;}";}	
	}	
		
	if (ck_geomorph.checked)
	{CartoCSSVR = CartoCSSVR + "#cv_250m_line [geomorph = 5]{line-color: #000;}#cv_250m_line [geomorph = 4]{line-color: #525252;}#cv_250m_line [geomorph = 3]{line-color: #d9d9d9;}";}	

	if (ck_habitats.checked)
	{CartoCSSVR = CartoCSSVR + "#cv_250m_line [hrank_cur = 5]{line-color: #000;}#cv_250m_line [hrank_cur < 5]{line-color: #525252;}#cv_250m_line [hrank_cur < 4]{line-color: #d9d9d9;}#cv_250m_line [hrank_cur < 3]{line-color: #fff;}";}
		
	if (ck_climate.checked){		
		if (ck_SLR1.checked)	
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line {line-color: #fff;}";}
		else if (ck_SLR2.checked)	
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line {line-color: #fff;}";}
		else if (ck_SLR3.checked)	
		{CartoCSSVR = CartoCSSVR + "#cv_250m_line {line-color: #525252;}";}
	}	
	
	  cartodb.createLayer(map, layerUrlCV)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryVR,
		  cartocss: CartoCSSVR,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersVR.push(sublayer);
		//population.setZIndex(13);		
		layer.setZIndex(14);
		//conserv.setZIndex(15);
		//infrast.setZIndex(16);
	  }).on('error', function() {
		// log the error
	  });
	

	//////////////////////////
	// hab loss
	//////////////////////////	

	if (endHL > 0){
		sublayersHL[endHL-1].remove();
	}	
	endHL = endHL + 1;	
	
	// find list of checked boxes
	var checkedHLList = [];	
    var chk = document.getElementsByName('habloss[]')
    var len = chk.length

    for(i=0;i<len;i++){
		if(chk[i].checked){
			checkedHLList.push(i+1);
        }
    }
	
	var MapQueryHL = "SELECT * FROM hab_loss_merge5";	
	
	if (checkedHLList.length > 0){
		MapQueryHL =  MapQueryHL + " WHERE id="+checkedHLList[0];
		for(i=1;i<checkedHLList.length;i++){
			 MapQueryHL = MapQueryHL + " OR id="+checkedHLList[i];
		}
		var CartoCSSHL = "#hab_loss_merge5{polygon-fill: #f33;polygon-opacity: 0.45;line-color: #FFF;line-width: 0;line-opacity: 0;}";	
	}
	else{
		var CartoCSSHL = "#hab_loss_merge5{polygon-fill: #f33;polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}";		
	}

	cartodb.createLayer(map, habLoss)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryHL,
		  cartocss: CartoCSSHL,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersHL.push(sublayer);
		//population.setZIndex(13);		
		layer.setZIndex(14);
		//conserv.setZIndex(15);
		//infrast.setZIndex(16);
	  }).on('error', function() {
		// log the error
	  });
	  
}

////////////////////////////////////////////////////////////////////////////////////////////////
// METRICS
////////////////////////////////////////////////////////////////////////////////////////////////

var endMetrics = 0;  
var sublayersEco = [];  
var sublayersInfrast = [];

function clearMetrics(){

	if (endMetrics > 0){
		sublayersEco[endMetrics-1].remove();
		sublayersInfrast[endMetrics-1].remove();
	}
	endMetrics = endMetrics + 1;
	
	document.getElementById("MetricsLegend").innerHTML = "";		
	
	//////////////////////////
	// infrastructure
	//////////////////////////	
	
	var MapQueryInfrast = "SELECT * FROM infrastructure WHERE cartodb_id = 1";
	var CartoCSSInfrast = "#infrastructure {marker-fill-opacity: 0;marker-line-color: #FFF;marker-line-width: 0;marker-line-opacity: 0}";
	
	  cartodb.createLayer(map, infrast)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryInfrast,
		  cartocss: CartoCSSInfrast,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersInfrast.push(sublayer);
		layer.setZIndex(1);
	  }).on('error', function() {
		// log the error
	  });	
	
	//////////////////////////
	// ecological
	//////////////////////////
	var MapQueryEco = "SELECT * FROM eco_assets WHERE cartodb_id = 1";
	var CartoCSSEco = "#eco_assets {polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}";
	
	  cartodb.createLayer(map, ecoAssets)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryEco,
		  cartocss: CartoCSSEco,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersEco.push(sublayer);	
		layer.setZIndex(1);
	  }).on('error', function() {
		// log the error
	  });
}

function showMetrics(){

	var sql = cartodb.SQL({ user: 'gverutes' });
	
	function ZoomMetrics(MapQuery){
		sql.getBounds(MapQuery).done(function(bounds) {
		map.fitBounds(bounds);
		});
	}	
	
	if (endMetrics > 0){
		sublayersEco[endMetrics-1].remove();
		sublayersInfrast[endMetrics-1].remove();
	}
	endMetrics = endMetrics + 1;
	
	var HTML5 = "";
	HTML5 = HTML5 + "<br><fieldset><legend><b>LEGEND</b></legend><img src='img/Legend_4.png'></fieldset>";		
	document.getElementById("MetricsLegend").innerHTML = HTML5;
	
	//////////////////////////
	// infrastructure
	//////////////////////////	
	
	var MapQueryInfrast = "SELECT * FROM infrastructure";
	var CartoCSSInfrast = "#infrastructure {marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0.5;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 5;marker-allow-overlap: true;[zoom > 9]{ marker-width: 15; marker-line-width: 1;}}#infrastructure[type='black']{marker-fill: #000000;}#infrastructure[type='blue']{marker-fill: #41ab5d;}#infrastructure[type='brown']{marker-fill: #FF0;}#infrastructure[type='green']{marker-fill: #6baed6;}#infrastructure[type='orange']{marker-fill: #6baed6;}#infrastructure[type='pink']{marker-fill: #F768A1;}";
	
	var ck_port = document.getElementById('checkbox-1a');
	var ck_beach = document.getElementById('checkbox-2a');
	var ck_infrast = document.getElementById('checkbox-3a');	

	if (ck_port.checked && ck_beach.checked && ck_infrast.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='black' OR type='brown' OR type='green' OR type='orange' OR type='pink' OR type='blue'";}	
	else if (ck_port.checked && ck_infrast.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='black' OR type='green' OR type='orange' OR type='pink' OR type='blue'";}	
	else if (ck_beach.checked && ck_infrast.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='brown' OR type='green' OR type='orange' OR type='pink' OR type='blue'";}
	else if (ck_port.checked && ck_beach.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='black' OR type='brown'";}	
	else if (ck_infrast.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='green' OR type='orange' OR type='pink' OR type='blue'";}	
	else if (ck_beach.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='brown'";}	
	else if (ck_port.checked)
	{MapQueryInfrast = MapQueryInfrast + " WHERE type='black'";}
	else{
		var CartoCSSInfrast = "#infrastructure {marker-fill-opacity: 0;marker-line-color: #FFF;marker-line-width: 0;marker-line-opacity: 0;";
	}

	  cartodb.createLayer(map, infrast)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryInfrast,
		  cartocss: CartoCSSInfrast,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersInfrast.push(sublayer);
		//population.setZIndex(13);		
		layer.setZIndex(101);
		//conserv.setZIndex(15);
		//infrast.setZIndex(16);
	  }).on('error', function() {
		// log the error
	  });	
	
	//////////////////////////
	// ecological
	//////////////////////////
		
	var MapQueryEco = "SELECT * FROM eco_assets";
	var CartoCSSEco = "#eco_assets {polygon-opacity: 0.25;line-color: #FFF;line-width: 0.5;line-opacity: 1;}#eco_assets[type=1] {polygon-fill: #FF0; line-color: #FF0;}#eco_assets[type=2] {polygon-fill: #136400; line-color:#136400;}#eco_assets[type=3] {polygon-fill: #3E7BB6; line-color: #3E7BB6;}";
	
	var ck_bird = document.getElementById('checkbox-1b');
	var ck_turtle = document.getElementById('checkbox-2b');
	var ck_dugong = document.getElementById('checkbox-3b');
	
	if (ck_bird.checked && ck_turtle.checked && ck_dugong.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=1 OR type=2 OR type=3";}	
	else if (ck_bird.checked & ck_turtle.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=1 OR type=2";}	
	else if (ck_bird.checked & ck_dugong.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=1 OR type=3";}	
	else if (ck_bird.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=1";map.setView([24.85, 55.45], 8);}	
	else if (ck_turtle.checked && ck_dugong.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=2 OR type=3";map.setView([24.6, 54.3], 8);}
	else if (ck_turtle.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=2";map.setView([24.95, 54.58], 9);}	
	else if (ck_dugong.checked)
	{MapQueryEco = MapQueryEco + " WHERE type=3";map.setView([24.4, 53.2], 9);}
	else{
		var CartoCSSEco = "#eco_assets{polygon-opacity: 0;line-color: #FFF;line-width: 0;line-opacity: 0;}";
	}	
	
	  cartodb.createLayer(map, ecoAssets)
	  .addTo(map)
	  .on('done', function(layer) {
		// change the query for the first layer
		var subLayerOptions = {
		  sql: MapQueryEco,
		  cartocss: CartoCSSEco,
		}
		var sublayer = layer.getSubLayer(0);
		sublayer.set(subLayerOptions);
		sublayersEco.push(sublayer);
		//population.setZIndex(13);		
		layer.setZIndex(13);
		//conserv.setZIndex(15);
		//infrast.setZIndex(16);
	  }).on('error', function() {
		// log the error
	  });
}