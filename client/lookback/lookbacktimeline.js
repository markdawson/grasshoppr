import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

import { Entries } from '../../collections/entries.js';

// import the template to manipulate DOM
import './lookbacktimeline.html';

Template.lookbacktimeline.onCreated(function lookbackOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
  user_entries = Entries.find({}, {sort: { selectedDate: -1 }} ).fetch();

  const instance = Template.instance();
  $.getScript("https://www.gstatic.com/charts/loader.js", function() {

    // Prepare data for chart
    let user_data = [];
    for(let entry of user_entries) {
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
        let columnindex = 0;
        let selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          let value = data.getValue(selectedItem.row, columnindex);
          let selectedEntry = Entries.findOne({selectedDateParse: Date.parse(value)});
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
  // 'keyup'(event) {
  //   alert('something happened');
  //   console.log(event);
  //   if(event.keyCode == 37) { // left
  //     FlowRouter.go('lookbackgrid');
  //   }
  //   else if(event.keyCode == 39) { // right
  //     FlowRouter.go('lookbackgrid');
  //   }
  // }
});

Template.lookbacktimeline.helpers({
    selectedEntry() {
      const instance = Template.instance();
      return instance.state.get('selectedEntry');
    }
});

Template.lookbacktimeline.onRendered(function() {
  // Materialize.toast(message, displayLength, className, completeCallback);
  setTimeout( () => {
    Materialize.toast('Trying clicking on points on the timeline!', 7000, 'rounded green');
  }, 5000 ); // 4000 is the duration of the toast
});