var ConfusionSchema = new SimpleSchema({
  reason: {
    type: String,
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  text: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  tags: {
    type: String,
    optional:true
  },
  start_highlight:{
    type: Number,
    optional: true
  },
  end_highlight:{
    type:Number,
    optional:true
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

Confusions = new Meteor.Collection("confusions");
Confusions.allow({
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
Confusions.attachSchema(ConfusionSchema);