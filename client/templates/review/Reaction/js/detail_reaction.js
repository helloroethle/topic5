Template.detailReaction.events({
  'click .btn-template-delete': function(e) {
      Reactions.remove(this._id);
  }
})