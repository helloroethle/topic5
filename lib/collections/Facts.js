var FactSchema = new SimpleSchema({
  fact: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 5
      }
    }
  },
  comments: {
    type: String,
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 5
      }
    }
  },
  tags: {
    type: String,
    optional:true
  },
  source: {
    type: String,
    optional:true,
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
  userArticleId: {
    type: String,
    optional:true
  }
});

Facts = new Meteor.Collection("facts");

Facts.allow({
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

Facts.attachSchema(FactSchema);