
google.load("visualization", "1", {packages:["controls",'corechart']}); 
google.setOnLoadCallback(function() { drawRegionsMap('"2007"', '"Natural gas"'); });



function drawRegionsMap(year,energy) {
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1EXQrQ6-37bnSdssusLF3KsGy03TjvY9ciIroO0QTL8E/edit?usp=sharing');	
	var selection = new String;
	selection = selection.concat('SELECT B,D WHERE A=',year,' AND C=',energy,'ORDER BY D DESC');
	console.log(selection)
	query.setQuery(selection);
	query.send(handleQueryResponse);

}

function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	console.log(data)
	var formatter = new google.visualization.NumberFormat({suffix: ' €'});
	formatter.format(data, 1);
	var map = new google.visualization.GeoChart(document.getElementById('mapa'));
	var barras = new google.visualization.BarChart(document.getElementById('barras'));
	var options = {backgroundColor: '#888888',region: '150', colors:['yellow', '#e0440e'], datalessRegionColor: '#888888'};
	var options_barras = {height:900, backgroundColor: { fill:'transparent' } ,colors:['#e0440e'], title: 'Ranking de países', legend: {position:'none'}};
	map.draw(data, options);
	barras.draw(data, options_barras)
}



function cambio() {
    var x = document.getElementById("year").selectedIndex;
    cambiador = document.getElementsByTagName("option")[x].value
    finalyear = new String;
    finalyear = finalyear.concat('"',cambiador,'"');

    var y = document.getElementById("energia_selector").elements.namedItem("energia").value;
    console.log(y)
    finalenergy = new String;
    finalenergy = finalenergy.concat('"',y,'"');
    console.log(finalenergy)

    document.getElementById("grafico").innerHTML = 'Cost (€/kWh) of ' + y + ' in year ' + cambiador;

    drawRegionsMap(finalyear,finalenergy);
}