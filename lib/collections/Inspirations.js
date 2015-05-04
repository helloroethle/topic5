var InspirationSchema = new SimpleSchema({
  inspiration: {
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

Inspirations = new Meteor.Collection("inspirations");

Inspirations.attachSchema(InspirationSchema);