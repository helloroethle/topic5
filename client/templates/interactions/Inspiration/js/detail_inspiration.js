Template.detailInspiration.events({
  'click .btn-template-delete': function(e) {
      Inspirations.remove(this._id);
  }
})

Template.detailInspiration.rendered = function(){
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

Template.detailInspiration.helpers({
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
