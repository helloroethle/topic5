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
  favorite: {
    type:Boolean,
    optional: true,
    defaultValue: false
  },
  archived: {
    type:Boolean,
    optional: true,
    defaultValue: false
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



Meteor.methods({
  getPopularArticles: function() {
    return Articles.aggregate([{"$group" : {_id:"$url", count:{$sum:1}}}]);
  },
  getTags: function(){
    return Articles.aggregate([
       { "$project": { "tags":1 }},  
       { "$unwind": "$tags" },  
       { "$group": { "_id": "$tags", "count": { "$sum": 1 } } } 
    ]);
  }
});
