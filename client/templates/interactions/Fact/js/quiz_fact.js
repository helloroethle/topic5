Template.quizFact.events({
  'blur input.answer': function (e) {
    Session.set('current_user_answer', e.currentTarget.value);
  }
});