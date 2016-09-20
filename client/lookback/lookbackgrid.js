import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

import { Entries } from '../../collections/entries.js';

// import the template to manipulate DOM
import './lookbackgrid.html';

Template.lookbackgrid.onCreated(function lookbackOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
  user_entries = Entries.find({}, {sort: { selectedDate: -1 }} ).fetch();
  console.log(user_entries);
});

Template.lookbackgrid.helpers({
	user_entries(){
		return user_entries;
	}
});