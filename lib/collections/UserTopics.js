var UserTopicSchema = new SimpleSchema({
  topic: {
    type: String
  },
  title: {
    type: String
  },
  topicStart: {
    type: Date,
    defaultValue: Date.now
  },
  topicEnd: {
    type: Date
  },

});


UserTopics = new Meteor.Collection("usertopics");

UserTopics.attachSchema(UserTopicSchema);