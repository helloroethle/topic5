// Define the schema
ArticleSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  author: {
    type: String,
    label: "Author",
  },
  url: {
    type: String,
    label: "URL"
  },
  html:{
    type: String,
    label: "Text",
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 5
      }
    }
  },
  source:{
    type: String,
    label: "Source",
    optional: true
  },
  published:{
    type: Date,
    label: "Published",
    optional: true,
    autoform: {
      type: "bootstrap-datepicker",
      datePickerOptions: { autoclose: true }
    }
  },
  summary: {
    type: String,
    label: "Summary",
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 3
      }
    }
  },
  tags: {
    type: String,
    optional: true
  },
  favorite: {
    type:Boolean,
    optional: true,
    defaultValue: false
  }
  // created: {
  //   type: Date,
  //   label: "Created"
  // }
});

Articles = new Meteor.Collection("articles");

Articles.attachSchema(ArticleSchema);

Articles.allow({
  update: function (){
    return true;
  },
  insert: function (){
    return true;
  },
  remove: function () {
    return true;
  },
});