Template.takeQuiz.created = function () {
  Session.set('progress', 0);
  Session.set('current_question_index', 0);
  Session.set('current_questions_correct', 0);
  Session.set('current_questions_incorrect', 0);
  Session.set('current_questions_remaining', this.data.questions.length);
  Session.set('total_questions', this.data.questions.length);
  Session.set('start_time', moment().toString());
  Session.set('show_right_sidebar', false);
  Session.set('current_correct', 0);
};

Template.takeQuiz.rendered = function () {
  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      if(Session.get('current_state') == 'grade'){
        markIncorrect();
        toggleActionButtons();
        nextQuestion();
        updateProgress();
        Session.set('current_state', 'answer');
      }
      else if(Session.get('current_state') == 'answer'){
        prevQuestion();
      }
    }
    else if(e.keyCode == 39) { // right
      if(Session.get('current_state') == 'grade'){
        markCorrect();
        toggleActionButtons();
        nextQuestion();
        updateProgress();
        Session.set('current_state', 'answer');
      }
      else if(Session.get('current_state') == 'answer'){
        nextQuestion();
      }
    }
  });
};

Template.takeQuiz.helpers({
  questionTemplate: function () {
    var index = Session.get('current_question_index');
    return this.questions[index].meta.quiz_template;
  },
  questionData: function (){
    var index = Session.get('current_question_index');
    var data = this.questions[index];
    Session.set('question_auto_grade', data.meta.quiz_auto_grade);
    Session.set('current_answer', data.answer);
    return this.questions[index];
  },
  questionIndex: function (){
    var index = Session.get('current_question_index');
    return index + 1;
  },
  score: function(){
    var number = (Session.get('current_questions_correct') / Session.get('total_questions'));
    return (number * 100).toFixed(1);
  },
  incorrect: function(){
    return Session.get('current_questions_incorrect');
  },
  correct: function(){
    return Session.get('current_questions_correct');
  },
  duration: function(){
    return Session.get('duration');
  },
  gradeColor: function(){
    var correct = Session.get('current_correct');
    if(correct == 0){
      return '';
    }
    else if(correct > 0){
      return 'correct';
    }
    else{
      return 'incorrect';
    }
  }
});

function toggleActionButtons(){
  $('.quiz-answer-button').toggle();
  $('.quiz-grade-container').toggle();
  $('.answer-container').toggle();
}

function toggleGraded(){
  $('.quiz-answer-button').toggle();
  $('.answer-container').toggle();  
  $('.quiz-auto-grade-container').toggle();
}

function getUserAnswer(){
  return Session.get('current_user_answer');
}

function autoGrade(){
    // perform attempt at grading
  var userAnswer = getUserAnswer();
  console.log(userAnswer);
  var answer = Session.get('current_answer');
  console.log(answer);
  if(userAnswer == answer){
    markCorrect();
  }
  else{
    markIncorrect();
  }
}

function toggleSummary(){
  $('#quiz-section').toggle();
  $('#quiz-summary').toggle();
}

function finishQuiz(){
  Session.set('progress', 100);
  var start_time = moment(Session.get('start_time'));
  var end_time = moment();
  var duration = moment.duration(end_time.diff(start_time));
  Session.set('duration', duration.hours() + ':' + duration.minutes() + ':' + duration.seconds());
  toggleSummary();
}

function nextQuestion(){
    var index = Session.get('current_question_index');
    if(Session.get('current_questions_remaining') == 0){
      finishQuiz();
    }
    index += 1;
    Session.set('current_question_index', index);
    Session.set('current_correct', 0);
}

function prevQuestion(){
    var index = Session.get('current_question_index');
    if(index == 0){
      return;
    }
    index -= 1;
    Session.set('current_question_index', index);
    Session.set('current_correct', 0);
}

function updateProgress(){
    var index = Session.get('current_question_index');
    var total = Session.get('total_questions');
    var width = (index / total) * 100;
    Session.set('progress', width);
}

function markCorrect(){
  Session.set('current_questions_correct', Session.get('current_questions_correct') + 1);
  Session.set('current_questions_remaining', Session.get('current_questions_remaining') - 1);
  $('#quick-jump li').eq(Session.get('current_question_index')).removeClass().addClass('correct');
  Session.set('current_correct', 1);
}

function markIncorrect(){
  Session.set('current_questions_incorrect', Session.get('current_questions_incorrect') + 1);
  Session.set('current_questions_remaining', Session.get('current_questions_remaining') - 1);
  $('#quick-jump li').eq(Session.get('current_question_index')).removeClass().addClass('incorrect');
  Session.set('current_correct', -1);
}

function retakeIncorrect(){
    Session.set('progress', 0);
    Session.set('start_time', moment().toString());
    Session.set('current_question_index', 0);
    Session.set('current_questions_remaining', Session.get('current_questions_incorrect')); 
    Session.set('current_questions_correct', 0);
    Session.set('current_questions_incorrect', 0);
    $('#quick-jump li.correct').addClass('inactive');
    $('#quiz-summary').hide();
    $('#quiz-section').show();
}

function retakeQuiz(){
    Session.set('progress', 0);
    Session.set('start_time', moment().toString());
    Session.set('current_question_index', 0);
    Session.set('current_questions_correct', 0);
    Session.set('current_questions_incorrect', 0);
    Session.set('current_questions_remaining', Session.get('total_questions')); 
    $('#quick-jump li').removeClass();
    $('#quiz-summary').hide();
    $('#quiz-section').show();
}

Template.takeQuiz.events({
  'keypress .answer': function(e, template){
    if(e.which === 13){
      toggleActionButtons();
      Session.set('current_state', 'grade');
    }
  },
  'click .quiz-retake-incorrect': function(e, template){
    retakeIncorrect();
  },
  'click .quiz-retake-all' : function(e, template){
    retakeQuiz();
  },
  'click .quiz-return-home' : function(e, template){
    Router.go('listQuizes');
  },
  'click .view-comment': function(e, template){
    $("#comments").toggle();
  },
  'click .quiz-answer-button': function (e, template) {
    if(Session.get('question_auto_grade')){
      autoGrade();
      toggleGraded();
    }
    else{
      toggleActionButtons();
      Session.set('current_state', 'grade');
    }
  },
  'click .quiz-next':function(e, template){
    toggleGraded();
    nextQuestion();
  },
  'click .quiz-mark-correct':function(e, template){
    markCorrect();
    toggleActionButtons();
    nextQuestion();
    updateProgress();
    Session.set('current_state', 'answer');
  },
  'click .quiz-mark-incorrect':function(e, template){
    markIncorrect();
    toggleActionButtons();
    nextQuestion();
    updateProgress();
    Session.set('current_state', 'answer');
  },
  'click .quiz-prev-question':function(e, template){
    prevQuestion();
    updateProgress();
  },
  'click .quiz-next-question':function(e, template){
    nextQuestion();
    updateProgress();
  }
});