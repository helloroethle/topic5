Template.detailFact.events({
  'click .btn-template-delete': function(e) {
      Facts.remove(this._id);
  }
})