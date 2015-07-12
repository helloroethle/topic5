Template.detailVerification.events({
  'click .btn-template-delete': function(e) {
      Verifications.remove(this._id);
  }
})

Template.detailVerification.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailVerification.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    }
});
