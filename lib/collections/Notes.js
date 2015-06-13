var NoteSchema = new SimpleSchema({
  note: {
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
  highlight_start: {
    type: Number,
    optional: true
  },
  paragraph_start:{
    type: Number,
    optional: true
  },
  highlight_length:{
    type: Number,
    optional: true
  },
  show:{
    type: Boolean,
    optional: true
  },
  userArticleId: {
    type: String,
    optional:true
  }
});

Notes = new Meteor.Collection("Notes");

Notes.allow({
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

Notes.attachSchema(NoteSchema);