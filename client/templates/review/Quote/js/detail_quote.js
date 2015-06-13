Template.detailQuote.events({
  'click .btn-template-delete': function(e) {
      Quotes.remove(this._id);
  }
})

Template.detailQuote.rendered = function(){
  $('.tags-input').tagsinput();
}