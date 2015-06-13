Template.detailInspiration.events({
  'click .btn-template-delete': function(e) {
      Inspirations.remove(this._id);
  }
})

Template.detailInspiration.rendered = function(){
  $('.tags-input').tagsinput();
}