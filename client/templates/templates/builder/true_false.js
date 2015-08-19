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

Template.quizCreateTrueFalse.rendered = function () {
  if(this.data && this.data.question){
    if(this.data.answer){
      this.$("input[name=answer]").val([1]); 
    }
    else{
      this.$("input[name=answer]").val([0]); 
    }
     
  }
  
};