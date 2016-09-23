import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

import { Entries } from '../../collections/entries.js';
import { fixture_data } from './fixtures.js';

// import the template to manipulate DOM
import './lookbackgrid.html';

Template.lookbackgrid.onCreated(function lookbackOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
  db_data = Entries.find({}, {sort: { selectedDateParse: -1 }} ).fetch();
  user_entries = db_data.length > 2 ? db_data : fixture_data;
  console.log(user_entries);
});

Template.lookbackgrid.helpers({
	user_entries() {
		return user_entries;
	}
});