Template.detailDefinition.events({
  'click .btn-template-delete': function(e) {
      Definitions.remove(this._id);
  }
})