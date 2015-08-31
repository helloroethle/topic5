Template.detailMCQuiz.events({
  'click .btn-template-delete': function(e) {
      MCQuizes.remove(this._id);
  }
})

Template.detailMCQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailMCQuiz.helpers({
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
