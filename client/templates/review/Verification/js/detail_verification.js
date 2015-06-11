Template.detailVerification.events({
  'click .btn-template-delete': function(e) {
      Verifications.remove(this._id);
  }
})