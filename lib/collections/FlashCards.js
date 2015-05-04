var FlashcardSchema = new SimpleSchema({
  front_text: {
    type: String,
    defaultValue: '',
    trim: true
  },
  back_text: {
    type: String,
    defaultValue: '',
    trim: true
  },
  comments: {
    type: String
  },
  userArticleId: {
    type: String
  },
  categoryId: {
    type: String
  },
  created: {
    type: Date,
    defaultValue: Date.now
  }
});

FlashCards = new Meteor.Collection("flashcards");

FlashCards.attachSchema(FlashcardSchema);