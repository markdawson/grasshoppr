import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');

Entries.allow({
	insert: function(userId, doc) {
		return !!this.userId;
	}
});

Meteor.methods({
	'entries.insert'(entry) {
		check(entry, Object);

		// Make sure the user is logged in before inserting
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Entries.insert({
			selectedDate: entry.selectedDate,
			how_was_today: entry.how_was_today,
			focus: entry.focus,
			thought: entry.thought,
			people: entry.people,
			createdAt: new Date(),
			createdBy: this.userId
		});
	},
});

// EntrySchema = new SimpleSchema({
// 	how_was_today: {
// 		type: Number
// 	},
// 	focus: {
// 		type: Number
// 	},
// 	people: {
// 		type: [Object],
// 		optional: true
// 	},
// 	thought: {
// 		type: String
// 	},
// 	createdAt: {
// 		type: Date,
// 		autoValue: function() {
// 			return new Date()
// 		},
// 		autoform: {
// 			type: "hidden"
// 		}
// 	},
// 	createdBy:
// 	 {
// 		type: String,
// 		autoValue: function() {
// 			return this.userId
// 		},
// 		autoform: {
// 			type: "hidden"
// 		}
// 	}
// });

// Entries.attachSchema(EntrySchema);
