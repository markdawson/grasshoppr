import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';

import { Entries, People } from '../../collections/entries.js';

// import the template to manipulate DOM
import './lookbackpeople.html';

// Template.lookbackpeople.onCreated(function peopleOnCreated() { 
// });

Template.lookbackpeople.onCreated(function lookbackOnCreated() {
	Meteor.subscribe('entries');
	// TODO limit the number of person cards here
	db_data = People.find({}, {sort: { last_updated: -1 }} ).fetch();
	person_cards = [];
	for(let p of db_data) {
		let person = {
			name: p.name,
			days_since: 1, // add days since using last_updated
			associated_people: p.associated_people,
			how_was_today_average: 1, // add how was today average
			focus_average: 1, // add focus average
		};
		// add new entry
		person_cards.push(person);
	};
	//alert(db_data);
});

Template.lookbackpeople.helpers({
	person_entries() {
		return person_cards;
	}
});

Template.lookbackpeople.onRendered(function lookbackpeopleOnRendered() {
	console.log(person_cards);
});