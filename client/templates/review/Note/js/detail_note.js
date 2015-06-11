Template.detailNote.events({
  'click .btn-template-delete': function(e) {
      Notes.remove(this._id);
  }
})