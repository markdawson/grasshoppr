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
	Meteor.subscribe('people');

	/* helper functions */
	function getMax(people_array) {
		let i = 0;
		let max_entry = ['',0];
		let max_index = 0
		while(i < people_array.length) {
			// could implement binary serach here, but running out of time...
			if (people_array && max_entry[1] < people_array[i][1]) {
				max_entry = people_array[i];
				max_index = i;
			}
			i++;
			//console.log('people array after splice', people_array);
		}
		people_array.splice(max_index, 1);

		return [max_entry, people_array];
	}

	function avg(array) {
		let sum = 0;
		for (let e of array) {
			sum += e;
		}
		let result = sum / array.length;
		return result;
	}

	// TODO limit the number of person cards here
	db_data = People.find({}, {sort: { last_updated: -1 }} ).fetch();
	console.log(db_data);
	person_cards = [];
	for(let p of db_data) {
			
		top_people = []
		let people_array = p.associated_people
		const n = 3;
		while(n > 0) {
			let max_person = getMax(people_array);
			if (max_person[0][0]) {
				top_people.push(" " + max_person[0][0]);
			}
			else {
				break;
			}
			people_array = max_person[1];
			console.log(people_array);
			n--;
			}

		// console.log("top people for ", p, " are ", top_people);
		// console.log( Date);
		let today = new Date();
		const diff = new Date(today - p.last_updated);
		let person = {
			name: p.name,
			days_since: diff.getDate() - 1, // add days since using last_updated
			associated_people: top_people,
			how_was_today_average: Math.round(avg(p.how_was_today) * 100) / 100, // add how was today average
			focus_average: Math.round(avg(p.focus) * 100) / 100, // add focus average
		};
		// add new entry
		person_cards.push(person);
	};
});

Template.lookbackpeople.helpers({
	person_entries() {
		return person_cards;
	}
});

Template.lookbackpeople.onRendered(function lookbackpeopleOnRendered() {
	console.log(person_cards);
});