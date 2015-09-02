Template.detailResponseQuiz.events({
  'click .btn-template-delete': function(e) {
      ResponseQuizes.remove(this._id);
  }
})

Template.detailResponseQuiz.rendered = function(){
  $('.tags-input').tagsinput();
  Session.set('is_quiz_question', false); 
}

Template.detailResponseQuiz.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
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
