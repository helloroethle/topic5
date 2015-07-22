Template.quizReaction.helpers({
  question_label: function () {
    if(this.question && this.question.length > 0){
        return this.question;
    }
    if(this.agreement){
      return 'Why do you agree with this statement?';
    }
    else{
      return 'Why do you disagree with this statement?';
    }
  }
});