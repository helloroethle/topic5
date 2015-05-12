var UserArticleSchema = new SimpleSchema({
  // html: {
  //   type: String
  // },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  created: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updated: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  articleId: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  userTopicId: {
    type: String,
    optional: true
  }
});


UserArticles = new Meteor.Collection("userarticles");

UserArticles.attachSchema(UserArticleSchema);