var ResponsequizSchema = new SimpleSchema({
  question: {
    type: String,
    defaultValue: '',
    trim: true
  },
  answer: {
    type: String
  },
  minLength: {
    type:Number
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

ResponseQuizes = new Meteor.Collection("responsequizes");

ResponseQuizes.attachSchema(ResponsequizSchema);