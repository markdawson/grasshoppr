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

 	//Entries.find().sort({crea})

  	// google.charts.load('current', {'packages':['line']});
  	// google.charts.setOnLoadCallback(drawChart);

   //  function drawChart() {

   //    let data = new google.visualization.DataTable();
   //    data.addColumn('number', 'September');
   //    data.addColumn('number', 'How was today?');
   //    data.addColumn('number', 'How focused were you today?');

   //    data.addRows([
   //      [1,  5, 3],
   //      [2,  7, 6],
   //      [3,  8, 5],
   //      [4,  6, 5],
   //      [5,  7, 6],
   //      [6,  5, 2],
   //      [7,  4, 5],
   //      [8,  3, 4],
   //      [9,  8, 4],
   //      [10, 7, 8],
   //      [11, 8, 6],
   //      [12, 8, 6],
   //      [13, 7, 7],
   //      [14, 8, 7]
   //    ]);

   //    let matoptions = {
   //      chart: {
   //        title: 'Journal over time',
   //        curveType: 'function',

   //      },
   //      width: 900,
   //      height: 500
   //    };

   //    var matchart = new google.charts.Line(document.getElementById('linechart_material'));

   //    function selectHandler() {
		 //    let selectedItem = matchart.getSelection()[0];
		 //    if (selectedItem) {
		 //      //let value = data.getValue(selectedItem.row, selectedItem.column);
		 //       $('#modal1').openModal();
		 //    }
		 //  }

	  // google.visualization.events.addListener(matchart, 'select', selectHandler);
   //    matchart.draw(data, matoptions);
   //  }

    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['September', 'How was today?', 'How focused were you today?'],
          ['1',  5,      5],
          ['2',  6,      4],
          ['3',  5,       4],
          ['4',  7,      6],
          ['5',  8,      4],
          ['6',  7,      8],
          ['7',  9,      6],
          ['8',  6,      5],
          ['9',  4,      4],
          ['10',  3,      2],
          ['11',  6,      5],
          ['12',  5,      7],
          ['13',  7,      6],
          ['14',  8,      6],
          ['15',  8,      5],
          ['16',  7,      8],
        ]);

        var options = {
          title: 'Journal Over Time',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        function selectHandler() {
		    let selectedItem = chart.getSelection()[0];
		    if (selectedItem) {
		      //let value = data.getValue(selectedItem.row, selectedItem.column);
		       $('#modal1').openModal();
		    }
		  }
		google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
      }

  });

});