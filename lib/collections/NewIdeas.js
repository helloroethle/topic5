var NewideaSchema = new SimpleSchema({
  idea: {
    type: String,
    defaultValue: '',
    trim: true
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  sources_to_explore: {
    type: [String]
  },
  userArticleId: {
    type: String
  }
});

NewIdeas = new Meteor.Collection("newideas");

NewIdeas.attachSchema(NewideaSchema);