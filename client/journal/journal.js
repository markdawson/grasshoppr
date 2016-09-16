import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../collections/entries.js';

import './journal.html'

Template.journal.helpers({
	entries() {
		return Entries.find({});
	},
    how_was_today() {
    	const instance = Template.instance();
       	return instance.state.get('how_was_today'); 
    },
    focus() {
    	const instance = Template.instance();
      	return instance.state.get('focus'); 
    },
});

Template.journal.onCreated(function journalOnCreated() {
	this.state = new ReactiveDict();
});

Template.journal.events({
	'submit .new-entry'(event) {

		alert('something happend');
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const how_was_today = target.how_was_today.value;
		const focus = target.focus.value;
		// const people = target.how_was_today.value;
		const thought = target.thought.value;

		entry = {
			how_was_today: how_was_today,
			focus: focus,
			thought: thought,
			createdAt: new Date(),
			createdBy: this.userId
		}

		Meteor.call('entries.insert', entry);
	},
    'change .how_was_today'(event, instance) {
       instance.state.set('how_was_today', event.target.value); 
    },
    'change .focus'(event, instance) {
       instance.state.set('focus', event.target.value); 
    },
});
