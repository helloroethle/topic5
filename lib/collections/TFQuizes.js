var TfquizSchema = new SimpleSchema({
  question: {
    type: String,
    trim: true
  },
  answer: {
    type: Boolean,
    optional: true,
        autoform: {
          afFieldInput: {
            type: "boolean-radios"
          }
        }
  },
  tags: {
    type: String,
    optional:true
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
    optional: true
  }
});

TFQuizes = new Meteor.Collection("tfquizes");
TFQuizes.allow({
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
TFQuizes.attachSchema(TfquizSchema);