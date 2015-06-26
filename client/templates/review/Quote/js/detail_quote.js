Template.detailQuote.events({
  'click .btn-template-delete': function(e) {
      Quotes.remove(this._id);
  }
})

Template.detailQuote.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailQuote.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    }
});
