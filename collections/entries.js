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
		if (!this.userId) {
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
			person = People.findOne({
				owner: this.userId,
				name: name.tag
			});

			// Set up a list of people
			let others = entry.people.filter(p => p.tag !== name.tag); // don't associate a person to themselves


			console.log("others is")
			console.log(others);
			//console.log(person.name);

			// If person is not in the db created them
			if (!person) {
				others = others.map(p => [p.tag,1]); // since this is a new entry, everyone has been observed once
				console.log(others);
				People.insert({
					owner: this.userId,
					name: name.tag,
					createdAt: new Date(),
					associated_people: others,
					days: [entry.selectedDate],
					focus: [entry.focus],
					how_was_today: [entry.how_was_today],
					last_updated: entry.selectedDateParse,
				});
			}
			// If person is in the db update that entry
			else {
				for (let p of others) {
					let found;
					for (let name of person.associated_people){
						console.log("name is", name, "and p is ", p);
						found = false;
						if (name[0] === p.tag){
							name[1] += 1;
							found = true;
							break;
						}
					}
					if (!found) {
						person.associated_people.push([p.tag, 1]);
					}
				}

				People.update(
					// Query
					{
						owner: this.userId,
						name: name.tag
					},
					// Update
					{
						$set: {
							associated_people: person.associated_people,
							last_updated: entry.selectedDateParse,
						},
						$push: {
							days: entry.selectedDate,
							focus: entry.focus,
							how_was_today: entry.how_was_today
						}	
				});

				console.log('update complete');
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
