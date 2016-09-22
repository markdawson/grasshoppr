import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');
export const People = new Mongo.Collection('people');

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
			selectedDateParse: entry.selectedDateParse,
			how_was_today: entry.how_was_today,
			focus: entry.focus,
			thought: entry.thought,
			people: entry.people,
			createdAt: new Date(),
			createdBy: this.userId
		});


		for(let name of entry.people) {
			person = People.find({
				owner: this.userId,
				name: name.tag
			});

			// If person is not in the db created them
			if (!person.name) {
				let others = entry.people.map(p => p.tag);
				others = others.filter(p => p !== name.tag);
				People.insert({
					owner: this.userId,
					createdAt: new Date(),
					name: name.tag,
					associatedPeople: others,
					days: entry.selectedDate,
					focus: [entry.focus],
					how_was_today: [entry.how_was_today]
				});
			}
		}

	},

	'entries.delete_date'(date_to_delete) {
		// Make sure the user is logged in before inserting
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Entries.remove({selectedDate: date_to_delete});
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
