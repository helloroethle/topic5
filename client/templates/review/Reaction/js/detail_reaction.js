Template.detailReaction.events({
  'click .btn-template-delete': function(e) {
      Reactions.remove(this._id);
  }
})

Template.detailReaction.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailReaction.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    }
});
