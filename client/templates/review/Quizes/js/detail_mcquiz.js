Template.detailMCQuiz.events({
  'click .btn-template-delete': function(e) {
      MCQuizes.remove(this._id);
  }
})

Template.detailMCQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailMCQuiz.helpers({
    makeUniqueID: function () {
      return "form-" + this._id;
    }
});
