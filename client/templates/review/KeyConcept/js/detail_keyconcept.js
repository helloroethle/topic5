Template.detailConcept.events({
  'click .btn-template-delete': function(e) {
      KeyConcepts.remove(this._id);
  }
})

Template.detailConcept.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailConcept.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    }
});
