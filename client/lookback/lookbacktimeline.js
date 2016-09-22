import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

import { Entries } from '../../collections/entries.js';
import { fixture_data } from './fixtures.js';

// import the template to manipulate DOM
import './lookbacktimeline.html';

Template.lookbacktimeline.onCreated(function lookbackOnCreated() {
  this.state = new ReactiveDict();
  // I don't think this subscriptions are necessary since they are in the onRendered function?
  Meteor.subscribe('entries');
  Meteor.subscribe('people');
  //
  
  user_entries = Entries.find({}, {sort: { selectedDate: -1 }} ).fetch();

  const instance = Template.instance();
  $.getScript("https://www.gstatic.com/charts/loader.js", function() {

    // Prepare data for chart
    let timeline_entries;
    if (user_entries.length > 2) {
      timeline_entries = user_entries;
    }
    else {
      setTimeout( () => {
        Materialize.toast('This is sample data until you add your first 3 entries :)', 7000, 'rounded green');
      }, 1000 );
      setTimeout( () => {
        Materialize.toast('Trying clicking on points on the timeline!', 5000, 'rounded green');
      }, 5000 );
      timeline_entries = fixture_data;
    }

    let user_data = [];
    for(let entry of timeline_entries) {
      let data_entry = [new Date(entry.selectedDateParse), entry.how_was_today, entry.focus];
      user_data.push(data_entry);
    }

    // Prepare to load chart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      let data = new google.visualization.DataTable();
      data.addColumn('date', 'September');
      data.addColumn('number', 'How was today?');
      data.addColumn('number', 'How focused were you today?');
      data.addRows(user_data);

      let options = {
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

      let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

      function selectHandler() {
        let selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          let columnindex_of_date = 0;
          let current_date = data.getValue(selectedItem.row, columnindex_of_date);
          let selectedEntry;
          if (user_entries.length > 2) {
            selectedEntry = Entries.findOne({selectedDateParse: Date.parse(current_date)});
          }
          else {
            for(let entry of fixture_data) {
              if (entry.selectedDateParse === Date.parse(current_date)){
                selectedEntry = entry;
                break;
              }
            }
          }      

          instance.state.set('selectedEntry', selectedEntry);
          $('#modal1').openModal();
        }
          
      } 
        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
      }
  });

});

Template.lookbacktimeline.events({
  // TODO add clicking between visualizations
});

Template.lookbacktimeline.helpers({
    selectedEntry() {
      const instance = Template.instance();
      return instance.state.get('selectedEntry');
    }
});

Template.lookbacktimeline.onRendered(function() {
  Meteor.subscribe('entries');
  Meteor.subscribe('people');

});