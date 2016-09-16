import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../collections/entries.js';

import '.journal.html'

Template.journal.onCreated(function journalOnCreated() {
	this.state = new ReactiveDict();
});

Template.journal.helpers({
});