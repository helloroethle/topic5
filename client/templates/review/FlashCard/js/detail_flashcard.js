Template.detailFlashCard.events({
  'click .btn-template-delete': function(e) {
      Flashcards.remove(this._id);
  }
})

Template.detailFlashCard.rendered = function(){
  $('.tags-input').tagsinput();
}