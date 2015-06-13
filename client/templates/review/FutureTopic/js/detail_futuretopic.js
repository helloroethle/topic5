Template.detailFutureTopic.events({
  'click .btn-template-delete': function(e) {
      Notes.remove(this._id);
  }
})

Template.detailFutureTopic.rendered = function(){
  $('.tags-input').tagsinput();
}