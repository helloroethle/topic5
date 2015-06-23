Template.detailConfusion.events({
  'click .btn-template-delete': function(e) {
      Confusions.remove(this._id);
  }
})

Template.detailConfusion.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailConfusion.helpers({
    makeUniqueID: function () {
      return "form-" + this._id;
    }
});
