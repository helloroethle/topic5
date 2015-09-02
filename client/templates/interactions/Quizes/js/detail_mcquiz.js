Template.detailMCQuiz.rendered = function(){
  $('.tags-input').tagsinput();
  Session.set('is_quiz_question', false);
  this.autorun(function () {
    Session.set('current_answer_key', '');
    var resourceId = Session.get('currentResourceId');
    var template = this.templateInstance();
    if(template.data.answer){
      template.$('input[name="' + template.data.answer + '"]').parents('.mc-question-input-wrapper').find('.mc-answer-choice').prop('checked', true);  
    }
  });
}

Template.detailMCQuiz.helpers({
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

Template.detailMCQuiz.events({
  'click .mc-answer-choice':function(e){
    Session.set('mc_answer', $(e.currentTarget).parents('.mc-question-input-wrapper').find('input.form-control').attr('data-schema-key'));
  },
  'click .autoform-remove-item':function(e){
    var deleteKey = $(e.currentTarget).parents('.mc-question-input-wrapper').find('input.form-control').attr('data-schema-key');
    var answerKey = Session.get('mc_answer');
    if(deleteKey == answerKey){
      Session.set('mc_answer', '');
    }
  }
});