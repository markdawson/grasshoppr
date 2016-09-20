import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../collections/entries.js';

import './lookback.html';

Template.lookback.onCreated(function lookbackOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
  user_entries = Entries.find({}, {sort: { selectedDate: -1 }} ).fetch();
});

Template.lookback.onRendered(function() {
  // alert(user_entries);
	$.getScript("https://www.gstatic.com/charts/loader.js", function() {
    let user_data = [];
    for(let entry of user_entries) {

      let data_entry = [entry.selectedDate, entry.how_was_today, entry.focus];
      user_data.push(data_entry);
      //console.log(Date.parse(entry.selectedDate));
    }

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();

        data.addColumn('date', 'September');
        data.addColumn('number', 'How was today?');
        data.addColumn('number', 'How focused were you today?');

        data.addRows(user_data);
        // var data = google.visualization.arrayToDataTable(user_data);

        var options = {
          title: 'Journal Over Time',
          curveType: 'function',
          legend: { position: 'bottom' },
          pointSize: 6,
          hAxis: {
              gridlines: {
                  color: 'transparent'
              }
          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        function selectHandler() {
        let columnindex = 0;
		    let selectedItem = chart.getSelection()[0];
		    if (selectedItem) {
          let words = "Something's been clicked";
		      let value = data.getValue(selectedItem.row, columnindex);
          let selectedEntry = Entries.find({selectedDate: value});
          console.log(...selectedEntry);
          $('#modal1').openModal();
          }
        }
		    
		  google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
      }

  });

});

Template.lookback.helpers({
  thought() {
    return words;
  }
});