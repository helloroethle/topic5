var ReactionSchema = new SimpleSchema({
  reaction: {
    type: String,
    defaultValue: '',
    trim: true
  },
  agreement_score: {
    type: Number,
    defaultValue: 0,
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

Reactions = new Meteor.Collection("reactions");

Reactions.attachSchema(ReactionSchema);