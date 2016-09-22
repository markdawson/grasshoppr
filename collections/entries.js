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
			person = People.findOne({
				owner: this.userId,
				name: name.tag
			});

			// Set up associated people dictionary
			let others = entry.people.filter(p => p.tag !== name.tag); // don't associate a person to themselves
			others = others.map(p => p.tag); //get the name out of the tag object

			console.log("others is")
			console.log(others);
			//console.log(person.name);

			// If person is not in the db created them
			if (!person) {
				// Make a new dictionary for the new person entry	
				let others_map = new Map();
				others.map(p => others_map.set(p, 1)); // since this is a new entry, everyone has been observed once
				console.log(others_map);

				People.insert({
					owner: this.userId,
					name: name.tag,
					createdAt: new Date(),
					associatedPeople: others_map,
					days: [entry.selectedDate],
					focus: [entry.focus],
					how_was_today: [entry.how_was_today]
				});
			}
			// If person is in the db update that entry
			else {
				// Update associated people dictionary
				// let existing_map = new Map()
				//person.associatedPeople.map(p => existing_map.set(p, ));
				// console.log(person.associatedPeople);
				// console.log(typeof person.associatedPeople);
				// let name = "Jake";
				// person.associatedPeople[name] = person.associatedPeople[name] + 1;
				// console.log(person.associatedPeople[name]);


				for (let p of others) {
					myMap = new Map()
					console.log();
					console.log(p);
					console.log(person.associatedPeople[p]);
					console.log();
					myMap[p] = person.associatedPeople[p] ? person.associatedPeople[p] + 1 : 1;
					person.associatedPeople[p] = person.associatedPeople[p] ? person.associatedPeople[p] + 1 : 1;
				}

				// People.update(
				// 	// Query
				// 	{
				// 		owner: this.userId,
				// 		name: name.tag
				// 	},
				// 	// Update
				// 	{
				// 		$unset: {
				// 			associatedPeople: "",
				// 		},
				// });

				People.update(
					// Query
					{
						owner: this.userId,
						name: name.tag
					},
					// Update
					{
						$set: {
							associatedPeople: person.associatedPeople,
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
