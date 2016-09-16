import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../collections/entries.js';

import './journal.html'
import './nouislider.js'

var friends;
Template.journal.helpers({
	entries() {
		return Entries.find({});
	},
	selectedDate() {
		const instance = Template.instance();
		return instance.state.get('selectedDate')
	},
	// people() {
	// 	// return People.find({});
	// },
	conversation_partners(){
		const instance = Template.instance();
		return $('.chips-placeholder').material_chip('data');
	},
    how_was_today_reactive() {
    	const instance = Template.instance();
       	return instance.state.get('how_was_today'); 
    },
    focus_reactive() {
    	const instance = Template.instance();
      	return instance.state.get('focus'); 
    },
    thought_of_the_day(){
    	const instance = Template.instance();
    	return instance.state.get('thought');
    }
});

Template.journal.onCreated(function journalOnCreated() {
	this.state = new ReactiveDict();
});

Template.journal.events({
	'submit .new-entry'(event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const selectedDate = target.selectedDate.value;
		const how_was_today = target.how_was_today.value;
		const focus = target.focus.value;
		// const people = target.how_was_today.value;
		const thought = target.thought.value;
		const people = $('.chips-placeholder').material_chip('data');

		entry = {
			selectedDate: selectedDate,
			how_was_today: how_was_today,
			focus: focus,
			thought: thought,
			people: people,
			createdAt: new Date(),
			createdBy: this.userId
		}

		Meteor.call('entries.insert', entry);
	},
    'change .how_was_today'(event, instance) {
    	const today = event.target.value;
        instance.state.set('how_was_today', today);
    },
    'change .focus'(event, instance) {
       instance.state.set('focus', event.target.value); 
    },
    'change .chips'(event, instance){
    	instance.state.set('conversation_partners',$('.chips-placeholder').material_chip('data'));
    },
    'keyup #textarea1':function(event, instance) {
		instance.state.set('thought', event.target.value); 
    },

});

Template.journal.onRendered(function() {
	const instance = Template.instance();
	const today = instance.state.get('how_was_today');
	//$('.container').addClass('amber accent-' );
	$('.chips-placeholder').material_chip({
	    placeholder: '+Person',
	    secondaryPlaceholder: 'Person',
 	 });
	$('.chips').on('chip.add', function(e, chip){
  });
	$('input.autocomplete').autocomplete({
    	data: {
    		'Jack McGrath':null,
    		'Mark Dawson':null
    	}
  });
	$(document).ready(function() {
    $('input#input_text, textarea#textarea1').characterCounter();
  });
	let $input = $('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 5, // Creates a dropdown of 15 years to control year
  	});
  	let picker = $input.pickadate('picker');
  	picker.set('select', new Date());
});