Template.detailFact.events({
  'click .btn-template-delete': function(e) {
      Facts.remove(this._id);
  }
})

Template.detailFact.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailFact.helpers({
    makeUniqueID: function () {
      return "form-" + this._id;
    }
});
