// Define the schema
ArticleSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  author: {
    type: String,
    label: "Author",
    optional: true,
  },
  url: {
    type: String,
    label: "URL"
  },
  html:{
    type: String,
    label: "HTML",
  },
  source:{
    type: String,
    label: "Source",
    min: 0
  },
  published:{
    type: Date,
    label: "Published",
    optional: true,
  },
  summary: {
    type: String,
    label: "Summary",
    optional: true,
  },
  created: {
    type: Date,
    label: "Created"
  }
});

Articles = new Meteor.Collection("articles");

Articles.attachSchema(ArticleSchema);
