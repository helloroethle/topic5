var TfquizSchema = new SimpleSchema({
  question: {
    type: String,
    defaultValue: '',
    trim: true
  },
  answer: {
    type: Boolean
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

TFQuizes = new Meteor.Collection("tfquizes");

TFQuizes.attachSchema(TfquizSchema);