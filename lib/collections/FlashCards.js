var FlashcardSchema = new SimpleSchema({
  front_text: {
    type: String,
    label: 'Front of Card',
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  back_text: {
    type: String,
    label: 'Back of Card',
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  tags: {
    type: String,
    optional:true
  },
  quiz: {
    type: Boolean,
    optional:true
  },
  show:{
    type: Boolean,
    optional: true
  },
  comments: {
    type: String,
    optional:true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 4
      }
    }
  },
  userArticleId: {
    type: String,
    optional: true
  },
  categoryId: {
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
});

FlashCards = new Meteor.Collection("flashcards");
FlashCards.allow({
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
FlashCards.attachSchema(FlashcardSchema);