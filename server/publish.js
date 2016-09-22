import { Entries, People } from '../collections/entries.js'

Meteor.publish('entries', function() {
    return Entries.find({createdBy: this.userId});
});
Meteor.publish('people', function() {
	return People.find({owner: this.userId});
});