Template.detailIdea.events({
  'click .btn-template-delete': function(e) {
      Ideas.remove(this._id);
  }
})

Template.detailIdea.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailIdea.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    }
});
