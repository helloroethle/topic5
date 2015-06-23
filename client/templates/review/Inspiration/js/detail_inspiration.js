Template.detailInspiration.events({
  'click .btn-template-delete': function(e) {
      Inspirations.remove(this._id);
  }
})

Template.detailInspiration.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailInspiration.helpers({
    makeUniqueID: function () {
      return "form-" + this._id;
    }
});
