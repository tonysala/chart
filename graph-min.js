var ph,temp,ph_xmlhttp,temp_xmlhttp,ph_obj,temp_obj,ph_data="",temp_data="";function DbubbleSort(){var e,d,c,b,a;do{e=false;for(b=0;b<ph_obj.features.length-1;b++){d=c=0;d=ph_obj.features[b].attributes.SampleDate.split("/");c=ph_obj.features[b+1].attributes.SampleDate.split("/");d=d[2]+d[1]+d[0]+"";c=c[2]+c[1]+c[0]+"";if(d>c){a=ph_obj.features[b];ph_obj.features[b]=ph_obj.features[b+1];ph_obj.features[b+1]=a;e=true}}}while(e);do{ e=false;for(b=0;b<temp_obj.features.length-1;b++){d=c=0;d=temp_obj.features[b].attributes.SampleDate.split("/");c=temp_obj.features[b+1].attributes.SampleDate.split("/");d=d[2]+d[1]+d[0]+"";c=c[2]+c[1]+c[0]+"";if(d>c){a=temp_obj.features[b];temp_obj.features[b]=temp_obj.features[b+1];temp_obj.features[b+1]=a;e=true}}}while(e)}function nf(a){return a>9?""+a:"0"+a}function DformatData(){ph_data=temp_data="";var d,p,i,graph_code,dstr;DbubbleSort();for(i=0;i<ph_obj.features.length;i++){d=ph_obj.features[i].attributes.SampleDate;d=d.split("/");p=ph_obj.features[i].attributes.ParameterValue;dstr=d[2]+""+nf(d[1]*8)+""+nf(d[0]*2);ph_data+="{ x:"+dstr+", y:"+p.toFixed(2)+"}";if(i!==ph_obj.features.length-1){ph_data+=","}}p=d="";for(i=0;i<temp_obj.features.length;i++){d=temp_obj.features[i].attributes.SampleDate.split("/");p=temp_obj.features[i].attributes.ParameterValue;dstr=d[2]+""+nf(d[1]*8)+""+nf(d[0]*2);temp_data+="{ x:"+dstr+", y:"+p.toFixed(2)+"}";if(i!==temp_obj.features.length-1){temp_data+=","}}graph_code='document.getElementById("chartOne").style.display = "block";require(["dojox/charting/plot2d/Markers","dojox/charting/Chart","dojox/charting/SimpleTheme","dojox/charting/axis2d/Default","dojox/charting/plot2d/Grid","dojo/ready"],function(e,a,b,d){var f=new a("chartOne",{title:"Relationship of pH against Temperature over Time." ,titlePos:"top",titleGap:10,titleFont:"normal normal normal 12pt Arial",titleFontColor:"#195892"});f.addAxis("x",{title:"Time", labels: [{value: 20090000, text: "2009"},{value: 20100000, text: "2010"},{value: 20110000, text: "2011"},{value: 20120000, text: "2012"},{value: 20130000, text: "2013"},{value: 20140000, text: "2014"}],titleFont:"normal normal normal 12pt Arial"});f.addAxis("y",{vertical:true,min:-10,max:80,title:"Temperature",titleFont:"normal normal normal 12pt Arial", fontColor:"#5CAA23"});f.addPlot("default",{type:"Markers",tension:3,animate:{duration:1800}});f.addSeries("Temperature",['+temp_data+'],{stroke:{color:"#5CAA23",width:3}});f.addAxis("y2",{vertical:true,min:2,max:12,leftBottom:false,title:"pH",titleFont:"normal normal normal 12pt Arial",fontColor:"#336FA7"});f.addPlot("plot2",{type:"Markers",vAxis:"y2",xAxis:"x",tension:3,animate:{duration:1800}});f.addSeries("pH",['+ph_data+'],{plot:"plot2",stroke:{color:"#336FA7",width:3}});f.addPlot("grid",{type:"Grid",hMinorLines:false,vMajorLines:false,vMinorLines:false});f.render()});';eval(graph_code)}function DojoGraph(){var c=0;if(window.XMLHttpRequest){ph_xmlhttp=new XMLHttpRequest()}else{ph_xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}ph_xmlhttp.onreadystatechange=function(){if(ph_xmlhttp.readyState==4&&ph_xmlhttp.status==200&&ph_xmlhttp.responseText.length){ph_obj=eval("("+ph_xmlhttp.responseText+")");(c>0)?DformatData():c++}};
// Replace path/to/filename.json below with location of pH JSON File
ph_xmlhttp.open("GET","path/to/filename.json",true);ph_xmlhttp.send();if(window.XMLHttpRequest){temp_xmlhttp=new XMLHttpRequest()}else{temp_xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}temp_xmlhttp.onreadystatechange=function(){if(temp_xmlhttp.readyState==4&&temp_xmlhttp.status==200&&temp_xmlhttp.responseText.length){temp_obj=eval("("+temp_xmlhttp.responseText+")");(c>0)?DformatData():c++}};
// Replace path/to/filename.json below with location of Temperature JSON File
temp_xmlhttp.open("GET","path/to/filename.json",true);temp_xmlhttp.send()};
