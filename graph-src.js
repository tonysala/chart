// Defining Global Variables
var ph, temp, ph_xmlhttp, temp_xmlhttp, ph_obj, temp_obj, ph_data = "",temp_data = "";

function DbubbleSort() {
	var swapped, t1, t2, i, temp;
	// performing bubble sort on pH Data Array
	do {
		swapped = false;
		for (i = 0; i < ph_obj.features.length - 1; i++) {
			t1 = t2 = 0;
			// Convert Date into Comparable Integer
			t1 = ph_obj.features[i].attributes.SampleDate.split("/");
			t2 = ph_obj.features[i + 1].attributes.SampleDate.split("/");
			t1 = t1[2] + t1[1] + t1[0] + "";
			t2 = t2[2] + t2[1] + t2[0] + "";
			if (t1 > t2) {
				temp = ph_obj.features[i];
				ph_obj.features[i] = ph_obj.features[i + 1];
				ph_obj.features[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
	do {
		// performing bubble sort on Temperature Data Array
		swapped = false;
		for (i = 0; i < temp_obj.features.length - 1; i++) {
			t1 = t2 = 0;
			t1 = temp_obj.features[i].attributes.SampleDate.split("/");
			t2 = temp_obj.features[i + 1].attributes.SampleDate.split("/");
			t1 = t1[2] + t1[1] + t1[0] + "";
			t2 = t2[2] + t2[1] + t2[0] + "";
			if (t1 > t2) {
				temp = temp_obj.features[i];
				temp_obj.features[i] = temp_obj.features[i + 1];
				temp_obj.features[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
}

// Function to always return 2 digit integers
function nf(n) {
	return n > 9 ? "" + n : "0" + n;
}

function DformatData() {
	var d, p, i, graph_code, dstr;
	ph_data=temp_data=""; // Clean Vars
	DbubbleSort(); // Order Data Objects By SampleData
	for (i = 0; i < ph_obj.features.length; i++) { // ForEach pH Data Object
		d = ph_obj.features[i].attributes.SampleDate.split("/");
		p = ph_obj.features[i].attributes.ParameterValue; // Get pH Value From Object
		dstr = d[2] + "" + nf(d[1] * 8) + "" + nf(d[0] * 2); //  Format Date
		ph_data += "{ x:" + dstr + ", y:" + p.toFixed(2) + "}"; // Create Data String for dojo chart
		if (i !== ph_obj.features.length - 1) { // If this is the last object in the array, omit the comma
			ph_data += ",";
		}
	}
	p = d = ""; // Clean Vars
	
	// Repeating the Above for the Temperature Array
	for (i = 0; i < temp_obj.features.length; i++) {
		d = temp_obj.features[i].attributes.SampleDate.split("/");
		p = temp_obj.features[i].attributes.ParameterValue;
		dstr = d[2] + "" + nf(d[1] * 8) + "" + nf(d[0] * 2);
		temp_data += "{ x:" + dstr + ", y:" + p.toFixed(2) + "}";
		if (i !== temp_obj.features.length - 1) {
			temp_data += ",";
		}
	}
	// Include the Data into Executable String
	graph_code = "document.getElementById('chartOne').style.display = 'block';require(['dojox/charting/plot2d/Markers','dojox/charting/Chart','dojox/charting/SimpleTheme','dojox/charting/axis2d/Default','dojox/charting/plot2d/Grid','dojo/ready'],function(e,a,b,d){var f=new a('chartOne',{title:'Relationship of pH against Temperature over Time.',titlePos:'top',titleGap:10,titleFont:'normal normal normal 12pt Arial',titleFontColor:'#195892'});f.addAxis('x',{title:'Time',labels: [{value: 20090000, text: '2009'},{value: 20100000, text: '2010'},{value: 20110000, text: '2011'},{value: 20120000, text: '2012'},{value: 20130000, text: '2013'},{value: 20140000, text: '2014'}],titleFont:'normal normal normal 12pt Arial'});f.addAxis('y',{vertical:true,min:-10,max:80,title:'Temperature',titleFont:'normal normal normal 12pt Arial', fontColor:'#5CAA23'});f.addPlot('default',{type:'Markers',tension:3,animate:{duration:1800}});f.addSeries('Temperature',["+temp_data+"],{stroke:{color:'#5CAA23',width:3}});f.addAxis('y2',{vertical:true,min:2,max:12,leftBottom:false,title:'pH',titleFont:'normal normal normal 12pt Arial',fontColor:'#336FA7'});f.addPlot('plot2',{type:'Markers',vAxis:'y2',xAxis:'x',tension:3,animate:{duration:1800}});f.addSeries('pH',["+ph_data+"],{plot:'plot2',stroke:{color:'#336FA7',width:3}});f.addPlot('grid',{type:'Grid',hMinorLines:false,vMajorLines:false,vMinorLines:false});f.render()});";
	// Execute Code
	eval(graph_code);
	ph = temp = ph_xmlhttp = temp_xmlhttp = ph_obj = temp_obj = ph_data = temp_data = "";
}

function DojoGraph() {
	var c = 0;
	ph = temp = ph_xmlhttp = temp_xmlhttp = ph_obj = temp_obj = ph_data = temp_data = "";
	//Start AJAX Request
	if (window.XMLHttpRequest) {
		ph_xmlhttp = new XMLHttpRequest();
	} else {
		ph_xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE Fallback
	}
	ph_xmlhttp.onreadystatechange = function () {
		if (ph_xmlhttp.readyState == 4 && ph_xmlhttp.status == 200 && ph_xmlhttp.responseText.length) {
			//Response -> Javascript Object
			ph_obj = eval("(" + ph_xmlhttp.responseText + ")");
			//Checking if both requests have completed before executing DformatData()
			(c > 0) ? DformatData() : c++;
		}
	}
	//Change JSON Location Below (pH Data File)
	ph_xmlhttp.open("GET", "filename.json", true);
	ph_xmlhttp.send();
	//Start AJAX Request
	if (window.XMLHttpRequest) {
		temp_xmlhttp = new XMLHttpRequest();
	} else {
		temp_xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE Fallback
	}
	temp_xmlhttp.onreadystatechange = function () {
		if (temp_xmlhttp.readyState == 4 && temp_xmlhttp.status == 200 && temp_xmlhttp.responseText.length) {
			//Response -> Javascript Object
			temp_obj = eval("(" + temp_xmlhttp.responseText + ")");
			//Checking if both requests have completed before executing DformatData()
			(c > 0) ? DformatData() : c++;
		}
	}
	//Change JSON Location Below (Temperature Data File)
	temp_xmlhttp.open("GET", "filename.json", true);
	temp_xmlhttp.send();
}
