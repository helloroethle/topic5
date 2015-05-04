var McquizSchema = new SimpleSchema({
  question: {
    type: String,
    defaultValue: '',
    trim: true
  },
  answer: {
    type: Number
  },
  choices: {
    type: [String]
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});


MCQuizes = new Meteor.Collection("mcquizes");

MCQuizes.attachSchema(McquizSchema);