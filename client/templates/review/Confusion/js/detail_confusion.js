Template.detailConfusion.events({
  'click .btn-template-delete': function(e) {
      Confusions.remove(this._id);
  }
})