var TimelineSchema = new SimpleSchema({
  title: {
    type: String,
    trim: true
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
  event_date: {
    type: Date
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
  level: {
    type: Number,
    defaultValue: 0,
    optional: true
  },
  userArticleId: {
    type: String,
    optional: true
  }
});

Timelines = new Meteor.Collection("timelines");
Timelines.allow({
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
Timelines.attachSchema(TimelineSchema);