Template.detailCategory.events({
  'click .btn-template-delete': function(e) {
      Categories.remove(this._id);
  }
})