import { Entries } from '../collections/entries.js'

Meteor.publish('entries', function() {
    return Entries.find({});
});

// Meteor.publish('entries', function() {
//     return Entries.find({createdBy: this.userId});
// });