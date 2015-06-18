Template.detailNote.events({
  'click .btn-template-delete': function(e) {
      Notes.remove(this._id);
  }
})

Template.detailNote.helpers({
    makeUniqueID: function () {
      return "form-" + this._id;
    }
});


Template.detailNote.rendered = function(){
  $('.tags-input').tagsinput();
}