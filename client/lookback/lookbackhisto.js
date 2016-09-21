import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

import { Entries } from '../../collections/entries.js';

// import the template to manipulate DOM
import './lookbackhisto.html';

Template.lookbackhisto.onCreated(function histoOnCreated() { 

	$.getScript("https://www.gstatic.com/charts/loader.js", function() {
	 google.charts.load("current", {packages:["corechart"]});
	      google.charts.setOnLoadCallback(drawChart);
	      function drawChart() {

	      	//let data = new google.visualization.DataTable();

	      	let twelth = new Date("12 September, 2016");
	      	twelth = twelth.getDate();

	        let data = google.visualization.arrayToDataTable([
	          ['Person', 'Date'],
	          // ['Frank', twelth],
	          ['Jack', new Date("12 September, 2016").getDate()],
	          ['Elizabeth', new Date('13 September, 2016').getDate()],
	          ['Frank', new Date("13 September, 2016").getDate()],
	          ['Jack', new Date("13 September, 2016").getDate()],
	          ['Elaine', new Date('14 September, 2016').getDate()],
	          ['Alexis', new Date("14 September, 2016").getDate()],
	          ['Visrut', new Date("14 September, 2016").getDate()],
	          ['Dev', new Date("14 September, 2016").getDate()],
	          ]);

	        let options = {
				title: 'Lengths of dinosaurs, in meters',
				legend: { position: 'none' },
				hAxis: 	{
					gridlines: {
						units: {
							days: {format: ['MMM dd']}
					 	}
					}
				}
	        };

	        var chart = new google.visualization.Histogram(document.getElementById('people_histogram'));
	        chart.draw(data, options);
	      }
	});

});