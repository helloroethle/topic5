Template.detailConcept.events({
  'click .btn-template-delete': function(e) {
      KeyConcepts.remove(this._id);
  }
})