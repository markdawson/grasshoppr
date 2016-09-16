Entries = new Mongo.Collection('entries');

Entries.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

EntrySchema = new SimpleSchema({
	how_was_today: {
		type: Number
	},
	focus: {
		type: Number
	},
	people: {
		type: String
	},
	thought: {
		type: String
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	},
	createdBy: {
		type: String,
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	}
});

Entries.attachSchema(EntrySchema);