Template.detailConcept.events({
  'click .btn-template-delete': function(e) {
      KeyConcepts.remove(this._id);
  }
})

Template.detailConcept.rendered = function(){
  $('.tags-input').tagsinput();
}