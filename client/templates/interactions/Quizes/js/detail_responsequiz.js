Template.detailResponseQuiz.events({
  'click .btn-template-delete': function(e) {
      ResponseQuizes.remove(this._id);
  }
})

Template.detailResponseQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailResponseQuiz.helpers({
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
    }
});
