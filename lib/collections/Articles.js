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
        rows: 5,
        class: "editable",
        placeholder: "add article text"
      }
    }
  },
  preTemplates:{
    type: [Object],
    optional: true
  },
  "preTemplates.$.title":{
    type: String
  },
  "preTemplates.$._id":{
    type: String
  },
  postTemplates:{
    type: [Object],
    optional: true
  },
  "postTemplates.$.title":{
    type: String,
    optional: true
  },
  "postTemplates.$._id":{
    type: String,
    optional: true
  },
  topics:{
    type: [Object],
    optional: true
  },
  "topics.$.title":{
    type: String,
    optional: true
  },
  "topics.$._id":{
    type:String,
    optional: true
  },
  icons:{
    type: [Object],
    optional: true
  },
  "icons.$.paragraph_index":{
    type:String,
    optional: true
  },
  "icons.$.class":{
    type:String,
    optional: true
  },
  "icons.$.resource":{
    type:String,
    optional: true
  },
  "icons.$.template":{
    type:String,
    optional: true
  },
  "icons.$.key":{
    type:String,
    optional:true
  },
  "icons.$.highlight_index":{
    type: Number,
    optional:true
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
    type: [String],
    optional: true
  },
  highlights: {
    type: String,
    optional: true
  },
  favorite: {
    type:Boolean,
    optional: true,
    defaultValue: false
  },
  highlightIndex: {
    type: Number,
    defaultValue: 1
  },
  archived: {
    type:Boolean,
    optional: true,
    defaultValue: false
  },
  lastRead: {
    type: Date,
    optional: true
  },
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
  userId: {
    type: String,
    autoValue: function(){
      return Meteor.userId();
    }
  }
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


