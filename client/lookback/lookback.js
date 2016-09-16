import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../collections/entries.js';

import './lookback.html';

Template.lookback.onRendered(function() {
	$.getScript("https://www.gstatic.com/charts/loader.js", function() {

	// google.charts.load('current', {'packages':['corechart']});
 //    google.charts.setOnLoadCallback(drawChart);

 //      function drawChart() {
 //        let data = google.visualization.arrayToDataTable([
 //          ['Year', 'How was today?', 'Focus'],
 //          ['2004',  1000,      400],
 //          ['2005',  1170,      460],
 //          ['2006',  660,       1120],
 //          ['2007',  1030,      540]
 //        ]);

 //        const options = {
 //          title: 'Company Performance',
 //          curveType: 'function',
 //          legend: { position: 'bottom' }
 //        };

 //        const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

 //        function selectHandler() {
	// 	    let selectedItem = chart.getSelection()[0];
	// 	    if (selectedItem) {
	// 	      let value = data.getValue(selectedItem.row, selectedItem.column);
	// 	      alert('The user selected ' + value);
	// 	    }
	// 	  }

	// 	google.visualization.events.addListener(chart, 'select', selectHandler);    
 //        chart.draw(data, options);
 //      }

 	// recentEntries = function(){ return Entries.find().sort{' ';}()

  	google.charts.load('current', {'packages':['line']});
  	google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      let data = new google.visualization.DataTable();
      data.addColumn('date', 'Day');
      data.addColumn('number', 'How was today?');
      data.addColumn('number', 'How focused were you today?');

      data.addRows([
        [1,  37.8, 80.8],
        [2,  30.9, 69.5],
        [3,  25.4,   57],
        [4,  11.7, 18.8],
        [5,  11.9, 17.6],
        [6,   8.8, 13.6],
        [7,   7.6, 12.3],
        [8,  12.3, 29.2],
        [9,  16.9, 42.9],
        [10, 12.8, 30.9],
        [11,  5.3,  7.9],
        [12,  6.6,  8.4],
        [13,  4.8,  6.3],
        [14,  4.2,  6.2]
      ]);

      let matoptions = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
      };

      var matchart = new google.charts.Line(document.getElementById('linechart_material'));

      function selectHandler() {
		    let selectedItem = matchart.getSelection()[0];
		    if (selectedItem) {
		      let value = data.getValue(selectedItem.row, selectedItem.column);
		      alert('The user selected ' + value);
		    }
		  }

	  google.visualization.events.addListener(matchart, 'select', selectHandler);
      matchart.draw(data, matoptions);
    }

  });

});