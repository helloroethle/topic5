var DefinitionSchema = new SimpleSchema({
  term: {
    type: String,
    trim: true
  },
  comments: {
    type: String
  },
  definition: {
    type: String,
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

Definitions = new Meteor.Collection("definitions");

Definitions.attachSchema(DefinitionSchema);