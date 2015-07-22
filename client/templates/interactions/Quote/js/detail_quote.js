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
    },
    hasQuestion: function (){
      if(this.question && this.question.length > 0){
        console.log('has question');
        return '';
      }
      else{
        console.log('no question');
        return 'hide';
      }
    }
});
