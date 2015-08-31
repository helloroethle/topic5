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
        return '';
      }
      else{
        return 'hide';
      }
    },
    hasTags: function (){
      if(this.tags && this.tags.length > 0){
        return '';
      }
      else{
        return 'hide';
      }
    }
});
