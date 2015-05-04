var ConfusionSchema = new SimpleSchema({
  reason: {
    type: String,
    defaultValue: '',
    trim: true
  },
  text: {
    type: String,
  },
  start_highlight:{
    type: Number
  },
  end_highlight:{
    type:Number
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

Confusions = new Meteor.Collection("confusions");

Confusions.attachSchema(ConfusionSchema);