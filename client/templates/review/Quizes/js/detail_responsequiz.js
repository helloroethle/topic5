Template.detailResponseQuiz.events({
  'click .btn-template-delete': function(e) {
      ResponseQuizes.remove(this._id);
  }
})

Template.detailResponseQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}