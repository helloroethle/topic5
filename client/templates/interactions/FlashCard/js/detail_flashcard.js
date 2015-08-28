Template.detailFlashCard.events({
  'click .btn-template-delete': function(e) {
      Flashcards.remove(this._id);
  }
})

Template.detailFlashCard.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailFlashCard.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    },
    hasQuestion: function (){
      if(this.question && this.question.length > 0){
        return '';
      }
      else{
        return 'hide';
      }
    }
});
