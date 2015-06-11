Template.detailTFQuiz.events({
  'click .btn-template-delete': function(e) {
      TFQuizes.remove(this._id);
  }
})