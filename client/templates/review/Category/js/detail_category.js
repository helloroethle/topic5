Template.detailCategory.events({
  'click .btn-template-delete': function(e) {
      Categories.remove(this._id);
  }
})

Template.detailCategory.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    }
});
