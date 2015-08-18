Template.templateText.helpers({
  isRequired: function () {
    if(this.value.required){
      return 'required';
    }
    return '';
  }
});

Template.quizText.events({
  'blur input.answer': function (e) {
    Session.set('current_user_answer', $('input.answer').val());
  }
});