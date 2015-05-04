var KeyConceptItemSchema = new SimpleSchema({
  concept: {
    type: String,
    defaultValue: '',
    trim: true
  },
  additionalInfo: {
    type: String
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  level: {
    type: Number,
    defaultValue: 0
  },
  userArticleId: {
    type: String
  }
});

var KeyConceptSchema = new SimpleSchema({
  concepts: {
    type: [KeyConceptItemSchema]
  }
})

KeyConcepts = new Meteor.Collection("keyconcepts");

KeyConcepts.attachSchema(KeyConceptSchema);