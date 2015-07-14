Template.takeQuizSidebar.helpers({
  questionsCorrect: function () {
    return Session.get('current_questions_correct');
  },
  questionsIncorrect: function (){
    return Session.get('current_questions_incorrect');
  },
  questionsRemaining: function (){
    return Session.get('current_questions_remaining');
  }
});

Template.takeQuizSidebar.events({
  'click .restart':function (e, template){
    console.log('hello restart click');
    Session.set('progress', 0);
    Session.set('current_question_index', 0);
    Session.set('current_questions_correct', 0);
    Session.set('current_questions_incorrect', 0);
    Session.set('current_questions_remaining', this.questions.length); 
  }
});