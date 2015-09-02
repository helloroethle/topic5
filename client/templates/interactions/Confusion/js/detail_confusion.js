Template.detailConfusion.events({
  'click .btn-template-delete': function(e) {
      Confusions.remove(this._id);
  }
})

Template.detailConfusion.rendered = function(){
  $('.tags-input').tagsinput();
  this.autorun(function () {
    var resourceId = Session.get('currentResourceId');
    var template = this.templateInstance();
    template.$('.control-label.selected-answer').removeClass('selected-answer');
    if(template.data.answer && template.data.answer.length > 0 && template.data.key && template.data.key.length > 0){
        Session.set('is_quiz_question', true); 
        var key = template.data.key;
        Session.set('current_answer_key', key);
        template.$('[name=' + key + ']').parents('.form-group').find('.control-label').addClass('selected-answer');
    }
    else{
      Session.set('is_quiz_question', false);
      Session.set('current_answer_key', '');
    }
  });
}

Template.detailConfusion.helpers({
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
