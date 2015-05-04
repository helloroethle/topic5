var UserArticleSchema = new SimpleSchema({
  // html: {
  //   type: String
  // },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  articleId: {
    type: String
  },
  userId: {
    type: String
  },
  userTopicId: {
    type: String,
  }
});


UserArticles = new Meteor.Collection("userarticles");

UserArticles.attachSchema(UserArticleSchema);