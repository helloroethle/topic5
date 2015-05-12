// Define the schema
CategorySchema = new SimpleSchema({
  title: {
    type: String,
    trim: true
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
  userId: {
    type: String,
    optional:true
  }
});

Categories = new Meteor.Collection("categories");

Categories.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

Categories.attachSchema(CategorySchema);
