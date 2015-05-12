var McquizSchema = new SimpleSchema({
  question: {
    type: String,
    trim: true
  },
  answer: {
    type: Number
  },
  choices: {
    type: [String]
  },
  comments: {
    type: String,
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 5
      }
    }
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  created: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updated: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  userArticleId: {
    type: String,
    optional:true
  }
});


MCQuizes = new Meteor.Collection("mcquizes");
MCQuizes.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});
MCQuizes.attachSchema(McquizSchema);