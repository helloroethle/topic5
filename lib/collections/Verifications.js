var VerificationSchema = new SimpleSchema({
  text: {
    type: String,
    defaultValue: '',
    trim: true
  },
  whyVerify: {
    type: String
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  userArticleId: {
    type: String
  }
});

Verifications = new Meteor.Collection("verifications");

Verifications.attachSchema(VerificationSchema);