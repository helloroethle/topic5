Template.templateTrueFalse.helpers({
  isRequired: function () {
    if(this.value.required){
      return 'required';
    }
    return '';
  }
});

Template.quizTrueFalse.created = function () {
  Session.set('current_user_answer' ,'');
};

Template.quizTrueFalse.events({
  'click .prompt-answer-container input': function (e) {
    Session.set('current_user_answer', e.currentTarget.value);
  }
});