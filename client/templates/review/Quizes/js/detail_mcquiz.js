Template.detailMCQuiz.events({
  'click .btn-template-delete': function(e) {
      MCQuizes.remove(this._id);
  }
})