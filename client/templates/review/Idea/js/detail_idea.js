Template.detailIdea.events({
  'click .btn-template-delete': function(e) {
      Ideas.remove(this._id);
  }
})