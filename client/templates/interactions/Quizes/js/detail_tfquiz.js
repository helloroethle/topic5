Template.detailTFQuiz.events({
  'click .btn-template-delete': function(e) {
      TFQuizes.remove(this._id);
  }
})

Template.detailTFQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailTFQuiz.helpers({
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
