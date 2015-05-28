
var drawchart;
$(document).ready(function(){
	$.getJSON('https://spreadsheets.google.com/feeds/worksheets/1EXQrQ6-37bnSdssusLF3KsGy03TjvY9ciIroO0QTL8E/public/values?alt=json',function(data){
		console.log(data.feed.entry[0].link[3].href)
		$.get(data.feed.entry[0].link[3].href);
	});
	
	$.jqplot.config.enablePlugins = true;
	$.jsDate.config.defaultCentury = 2000;
	drawchart = function (){
		var energia = document.getElementById("energia_selector").elements.namedItem("energia").value;
		var x = document.getElementById("pais").selectedIndex;
    	pais = document.getElementsByTagName("option")[x].value
		console.log(energia)
		var options={"separator":","};
	$.get('googlesheet.csv',function(googlesheet){var datos = $.csv.toArrays(googlesheet, options);
		console.log(datos)
		var dibujo = new Array();
		var year = new Array();
		var cost = new Array();
		j=0;
		console.log(datos[1][3])
		for(i=0; i<datos.length; i++){
			if(datos[i][1]==pais && datos[i][2]==energia){
			year[j] = parseInt(datos[i][0]);
			cost[j] = parseFloat(datos[i][3]);
			dibujo[j] = [year[j], cost[j]]
			j=j+1;
			} else{}
		}	
		console.log(dibujo)
		var ticks=[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
		$("#chartline" ).empty();
		$.jqplot('chartline', [dibujo], {
			title: 'Coste del consumo doméstico',
			seriesDefaults:{rendererOptions: {fillToZero: true}},
			pointLabels: {show: true},
			series: [{rendererOptions:{smooth: true}}],
			highlighter: { show: true },
			axes:{
				xaxis:{label:'Año', ticks: ticks, tickOptions:{formatString:'%d',showGridline: false}, autoscale: true},
				yaxis: {padMin: 1.2, rendererOptions:{fillToZero: true},tickOptions:{formatString:'%.4f',prefix:'€'}}
			},
			grid: {
            drawBorder: false,
            shadow: false,
            background: 'rgba(0,0,0,0)'
        	}
			
			
		});
	});
}
});



