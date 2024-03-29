var KeyConceptSchema = new SimpleSchema({
  concept: {
    type: String
  },
  details: {
    type: String,
    label: 'Details',
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  comments: {
    type: String,
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  question: {
    type: String,
    optional:true
  },
  answer: {
    type: String,
    optional:true
  },
  quiz: {
    type: Boolean,
    optional:true
  },
  show:{
    type: Boolean,
    optional: true
  },
  tags: {
    type: String,
    optional:true
  },
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
  level: {
    type: Number,
    defaultValue: 0,
    optional:true
  },
  userArticleId: {
    type: String,
    optional:true
  }
});


KeyConcepts = new Meteor.Collection("keyconcepts");
KeyConcepts.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function (){
    return true;
  },
});
KeyConcepts.attachSchema(KeyConceptSchema);