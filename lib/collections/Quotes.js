var QuoteSchema = new SimpleSchema({
  quote: {
    type: String,
    defaultValue: '',
    trim: true
  },
  source: {
    type: String,
    defaultValue: '',
    trim: true
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

Quotes = new Meteor.Collection("quotes");

Quotes.attachSchema(QuoteSchema);