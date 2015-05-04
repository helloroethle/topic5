var FuturetopicSchema = new SimpleSchema({
  topic: {
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

FutureTopics = new Meteor.Collection("futuretopics");

FutureTopics.attachSchema(FuturetopicSchema);