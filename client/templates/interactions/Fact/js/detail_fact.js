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
