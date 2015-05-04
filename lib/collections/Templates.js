var TemplateSchema = new SimpleSchema({
  title: {
    type: String,
    defaultValue: '',
    trim: true
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

Templates = new Meteor.Collection("templates");

Templates.attachSchema(TemplateSchema);