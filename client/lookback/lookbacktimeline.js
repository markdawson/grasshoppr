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

      // User had enough data to make a chart
      if (user_data.length > 2) {
        data.addRows(user_data);
      }

      // User does not have enough data to make a chart
      // So we make one for them
      else {
        Materialize.toast('This is sample data until you add your first 3 entries :)', 7000, 'rounded green');
        setTimeout( () => {
          Materialize.toast('Trying clicking on points on the timeline!', 5000, 'rounded green');
        }, 5000 );

        data.addRows([
          [new Date("12 September, 2016"), 5, 8],
          [new Date("13 September, 2016"), 6, 7],
          [new Date("14 September, 2016"), 7, 5],
          [new Date("15 September, 2016"), 8, 8],
          [new Date("16 September, 2016"), 9, 3],
          [new Date("17 September, 2016"), 7, 5],
          [new Date("18 September, 2016"), 6, 7],
        ]);
      }

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
          let columnindex_of_dateparse = 0;
          let value = data.getValue(selectedItem.row, columnindex_of_dateparse);

          // If user has enough data for the chart display real data
          if (user_data.length > 2) {
            let selectedEntry = Entries.findOne({selectedDateParse: Date.parse(value)});
            instance.state.set('selectedEntry', selectedEntry);
          }
          else {
            let selectedEntry = {
              selectedDate: String(data.getValue(selectedItem.row, columnindex_of_dateparse)).substr(0, 15),
              how_was_today: data.getValue(selectedItem.row, 1),
              focus: data.getValue(selectedItem.row, 2),
              people: [
                {
                  tag: 'Frank',
                },
                {
                  tag: 'Maggie',
                },                
                {
                  tag: 'Andy',
                },
                {
                  tag: 'Jovonnie',
                },
                {
                  tag: 'Jack',
                },              
              ],
              thought: "I really enjoyed bike riding today! I found a cool new spot in Carrboro!"
            };
            instance.state.set('selectedEntry', selectedEntry);
          }
        }
          $('#modal1').openModal();
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
   // 4000 is the duration of the toast
});