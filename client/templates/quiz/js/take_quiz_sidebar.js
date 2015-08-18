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
    Session.set('progress', 0);
    Session.set('start_time', moment().toString());
    Session.set('current_question_index', 0);
    Session.set('current_questions_correct', 0);
    Session.set('current_questions_incorrect', 0);
    Session.set('current_questions_remaining', this.questions.length); 
    $('#quick-jump li').removeClass();
    $('#quiz-summary').hide();
    $('#quiz-section').show();
    window.remaining = _.range(Session.get('total_questions'));
    window.answers = [];
  },
  'click #quick-jump li':function(e, template){
    if(Session.get('current_state') == 'grade'){
      toastr.error('Please mark answer as correct or incorrect');
      return;
    }
    else if(Session.get('current_state') == 'auto'){
      Session.set('current_correct', 0);
      Session.set('current_state', 'answer');
    }
    $('.quiz-answer-button').show();
    $('.quiz-grade-container').hide();
    $('.answer-container').hide();
    $('.quiz-auto-grade-container').hide();
    var index = parseInt($(e.currentTarget).text());
    Session.set('current_question_index', index - 1);
  },
});