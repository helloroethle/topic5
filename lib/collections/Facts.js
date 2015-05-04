var FactSchema = new SimpleSchema({
  fact: {
    type: String,
    defaultValue: '',
    trim: true
  },
  comments: {
    type: String
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

Facts = new Meteor.Collection("facts");

Facts.attachSchema(FactSchema);