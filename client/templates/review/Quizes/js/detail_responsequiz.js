Template.detailResponseQuiz.events({
  'click .btn-template-delete': function(e) {
      ResponseQuizes.remove(this._id);
  }
})

Template.detailResponseQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailResponseQuiz.helpers({
    makeUniqueID: function () {
      return "form-" + this._id;
    }
});
