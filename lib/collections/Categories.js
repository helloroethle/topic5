// Define the schema
CategorySchema = new SimpleSchema({
  title: {
    type: String,
    defaultValue: '',
    trim: true
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userId: {
    type: String
  }
});

Categories = new Meteor.Collection("categories");

Categories.attachSchema(CategorySchema);
