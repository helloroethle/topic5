Template.detailFlashCard.events({
  'click .btn-template-delete': function(e) {
      Flashcards.remove(this._id);
  }
})