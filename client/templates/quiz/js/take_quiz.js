window.remaining = [];
window.answers = [];
window.summaries = [];

Template.takeQuiz.created = function () {
  Session.set('progress', 0);
  Session.set('current_question_index', 0);
  Session.set('current_questions_correct', 0);
  Session.set('current_questions_incorrect', 0);
  Session.set('current_questions_remaining', this.data.questions.length);
  Session.set('total_questions', this.data.questions.length);
  Session.set('start_time', moment().toString());
  Session.set('show_right_sidebar', false);
  Session.set('is_current_correct', 0);
  Session.set('retake_count', 0);
  Session.set('is_detail_quiz', false);
  window.remaining = _.range(this.data.questions.length);
};

Template.takeQuiz.destroyed = function () {
  $("body").off('keydown');
};

Template.takeQuiz.rendered = function () {
  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      if(Session.get('current_state') == 'grade'){
        markIncorrect();
        toggleActionButtons();
        smartNextQuestion();
        // nextQuestion();
        updateProgress();
        Session.set('current_state', 'answer');
      }
      else if(Session.get('current_state') == 'auto'){
        toggleGraded();
        smartPrevQuestion();
        updateProgress();
        Session.set('current_state', 'answer');
      }
      else if(Session.get('retake_count') > 0){
        smartPrevQuestion();
      }
      // else if(Session.get('current_state') == 'answer'){
      else{
        prevQuestion();
      }
    }
    else if(e.keyCode == 39) { // right
      if(Session.get('current_state') == 'grade'){
        markCorrect();
        toggleActionButtons();
        // nextQuestion();
        smartNextQuestion();
        updateProgress();
        Session.set('current_state', 'answer');
      }
      else if(Session.get('current_state') == 'auto'){
        toggleGraded();
        smartNextQuestion();
        updateProgress();
        Session.set('current_state', 'answer');
      }
      else if(Session.get('retake_count') > 0){
        smartNextQuestion();
      }
      else{
        nextQuestion();
      }
    }
  });
};

Template.takeQuiz.helpers({
  questionTemplate: function () {
    var index = Session.get('current_question_index');
    if(this.questions[index].meta){
      return this.questions[index].meta.quiz_template;
    }
    else{
      return '';
    }
  },
  retakeCountLabel: function(){
    return Session.get('retake_count') + 1;
  },
  questionData: function (){
    var index = Session.get('current_question_index');
    var data = this.questions[index];
    if(data){
      console.log('setting auto grade flag');
      console.log(data.meta.quiz_auto_grade);
      Session.set('question_auto_grade', data.meta.quiz_auto_grade);
      Session.set('current_answer', data.answer);
    }
    return this.questions[index];
  },
  questionUnanswered: function (){
    var index = Session.get('current_question_index');
    if(_.indexOf(window.remaining, index) >= 0){
      return true;
    }
    return false;
  },
  userAnswer: function (){
    var index = Session.get('current_question_index');
    var answerObject = _.find(window.answers, function(item){
      return item.index == index;
    });
    if(answerObject){
      Session.set('is_current_correct', answerObject.result ? 1 : -1);
      return answerObject.answer;
    }
    return '';
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
    var correct = Session.get('is_current_correct');
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

function homeState(){
  console.log('home state');
  $('.quiz-answer-button').show();
  $('.quiz-grade-container').hide();
  $('.answer-container').hide();
  $('.quiz-auto-grade-container').hide();
}

function toggleActionButtons(){
  console.log('toggle action buttons');
  $('.quiz-answer-button').toggle();
  $('.quiz-grade-container').toggle();
  $('.answer-container').toggle();
}

function toggleGraded(){
  console.log('toggle graded');
  $('.quiz-answer-button').toggle();
  $('.answer-container').toggle();  
  $('.quiz-auto-grade-container').toggle();
}

function autoGrade(){
  console.log('auto grade');
  var userAnswer = Session.get('current_user_answer');
  var answer = Session.get('current_answer');
  if(userAnswer == answer){
    markCorrect();
  }
  else{
    markIncorrect();
  }
}

function toggleSummary(){
  console.log('toggle summary');
  $('#quiz-section').toggle();
  $('#quiz-summary').toggle();
  window.summaries.push(_.sortBy(window.answers, function(answer){ return answer.index; }));
}

function finishQuiz(){
  console.log('finish quiz');
  Session.set('progress', 100);
  var start_time = moment(Session.get('start_time'));
  var end_time = moment();
  var duration = moment.duration(end_time.diff(start_time));
  var hours = duration.hours();
  var minutes = duration.minutes();
  var seconds = duration.seconds();
  if(hours == 0){
    hours = '';
  }
  else if (hours   < 10) {
    hours  = "0" + hours + ':';
  }
  else{
    hours = hours + ':';
  }
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  Session.set('duration', hours + minutes + ':' + seconds);
  toggleSummary();
}

function smartPrevQuestion(){
  console.log('smart prev');
  if(Session.get('current_questions_remaining') == 0){
    finishQuiz();
  }
  var index = Session.get('current_question_index');
  var prevIndex = 0;
  for(var i = window.remaining.length - 1; i >= 0; i--){
    if(window.remaining[i] < index ){
      prevIndex = i;
      break;
    }
  }
  Session.set('current_question_index', window.remaining[prevIndex]);
  Session.set('is_current_correct', 0);
}

function smartNextQuestion(){
  console.log('smart next');
  if(Session.get('current_questions_remaining') == 0){
    finishQuiz();
  }
  var index = Session.get('current_question_index');
  var nextIndex = 0;
  for(var i = 0; i < window.remaining.length; i++){
    if(window.remaining[i] > index ){
      nextIndex = i;
      break;
    }
  }
  Session.set('current_question_index', window.remaining[nextIndex]);
  Session.set('is_current_correct', 0);
}

function nextQuestion(){
  console.log('nextQuestion');
    var index = Session.get('current_question_index');
    // if(Session.get('current_questions_remaining') == 0){
    //   finishQuiz();
    // }
    if(index >= (Session.get('total_questions') - 1)){
      index = 0;
    }
    else{
      index += 1;
    }
    Session.set('current_question_index', index);
    Session.set('current_correct', 0);
}

function prevQuestion(){
  console.log('prevQuestion');
    var index = Session.get('current_question_index');
    if(index <= 0){
      index = ( Session.get('total_questions') - 1 );
    }
    else{
      index -= 1;
    }
    Session.set('current_question_index', index);
    Session.set('is_current_correct', 0);
}

function updateProgress(){
    console.log('update progress');
    var correctCount = Session.get('current_questions_correct');
    var incorrectCount = Session.get('current_questions_incorrect');
    var index = correctCount + incorrectCount;
    var total = Session.get('total_questions');
    var width = (index / total) * 100;
    Session.set('progress', width);
}

function markCorrect(){
  console.log('correct');
  Session.set('current_questions_correct', Session.get('current_questions_correct') + 1);
  Session.set('current_questions_remaining', Session.get('current_questions_remaining') - 1);
  $('#quick-jump li').eq(Session.get('current_question_index')).removeClass().addClass('correct');
  Session.set('is_current_correct', 1);
  console.log(window.remaining);
  var index = Session.get('current_question_index');
  window.answers.push({
    'result' : 1,
    'answer' : Session.get('current_user_answer'),
    'index' : index
  });
  var deleteIndex = _.indexOf(window.remaining, index);
  if(deleteIndex >= 0){
    window.remaining.splice(deleteIndex, 1);  
    console.log(window.remaining);
  }  
}

function markIncorrect(){
  console.log('incorrect');
  Session.set('current_questions_incorrect', Session.get('current_questions_incorrect') + 1);
  Session.set('current_questions_remaining', Session.get('current_questions_remaining') - 1);
  $('#quick-jump li').eq(Session.get('current_question_index')).removeClass().addClass('incorrect');
  Session.set('is_current_correct', -1);
  var index = Session.get('current_question_index');
  window.answers.push({
    'result' : 0,
    'answer' : Session.get('current_user_answer'),
    'index' : index
  });
  var deleteIndex = _.indexOf(window.remaining, index);
  if(deleteIndex >= 0){
    window.remaining.splice(deleteIndex, 1); 
    console.log(window.remaining); 
  }
}

function retakeIncorrect(template){
  console.log(template);
  console.log(template.data);
  console.log('retake incorrect');
    Session.set('progress', 0);
    Session.set('start_time', moment().toString());
    Session.set('current_questions_remaining', Session.get('current_questions_incorrect')); 
    Session.set('total_questions', Session.get('current_questions_incorrect'));
    Session.set('current_questions_correct', 0);
    Session.set('current_questions_incorrect', 0);
    Session.set('is_current_correct', 0);
    Session.set('retake_count', Session.get('retake_count') + 1);
    $('#quick-jump li.correct').addClass('inactive');
    $('#quiz-summary').hide();
    $('#quiz-section').show();
    homeState();
    // get incorrect indexes and populate remaining array
    window.remaining = _.pluck(_.filter(window.answers, function(answer){ return !answer.result; }), 'index');
    // var incorrectQuestions = [];
    // for(var i = 0; i < template.data.questions.length; i++){
    //   if(_.indexOf(window.remaining, i) >= 0){
    //     incorrectQuestions.push(template.data.questions[i]);
    //   }
    // }
    // template.data.questions = incorrectQuestions;

    // _.each(window.remaining, function(item){
    //   var deleteIndex = -1;
    //   for(var i = 0; i < window.answers.length; i++){
    //     if(window.answers[i].index == item){
    //       deleteIndex = i;
    //       break;
    //     }
    //   }
    //   if(deleteIndex >= 0){
    //     window.answers.splice(deleteIndex, 1);  
    //   } 
    window.answers = []; 
    Session.set('current_question_index', window.remaining[0]);
    // });
}

function retakeQuiz(){
  console.log('retake quiz');
    Session.set('progress', 0);
    Session.set('start_time', moment().toString());
    Session.set('current_question_index', 0);
    Session.set('current_questions_correct', 0);
    Session.set('current_questions_incorrect', 0);
    Session.set('current_questions_remaining', Session.get('total_questions')); 
    $('#quick-jump li').removeClass();
    $('#quiz-summary').hide();
    $('#quiz-section').show();
    homeState();
    // populate remaining array with range
    window.remaining = _.range(Session.get('total_questions'));
    window.answers = [];
}

Template.takeQuiz.events({
  'keypress .answer': function(e, template){
    if(e.which === 13){
      console.log('hello answer')
      if(Session.get('current_state') == 'grade' || Session.get('current_state') == 'auto'){
        return;
      }
      if(Session.get('question_auto_grade')){
        Session.set('current_state', 'auto');
        autoGrade();
        toggleGraded();
      }
      else{
        toggleActionButtons();
        Session.set('current_state', 'grade');
      }
    }
  },
  'click .quiz-retake-incorrect': function(e, template){
    retakeIncorrect(template);
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
      Session.set('current_state', 'auto');
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
    smartNextQuestion();
    // nextQuestion(template.questionIndexes);
    updateProgress();
    Session.set('current_state', 'answer');
  },
  'click .quiz-mark-correct':function(e, template){
    markCorrect();
    toggleActionButtons();
    smartNextQuestion();
    // nextQuestion(template.questionIndexes);
    updateProgress();
    Session.set('current_state', 'answer');
  },
  'click .quiz-mark-incorrect':function(e, template){
    markIncorrect();
    toggleActionButtons();
    smartNextQuestion();
    // nextQuestion(template.questionIndexes);
    updateProgress();
    Session.set('current_state', 'answer');
  },
  // 'click .quiz-prev-question':function(e, template){
  //   prevQuestion();
  //   updateProgress();
  // },
  // 'click .quiz-next-question':function(e, template){
  //   nextQuestion();
  //   updateProgress();
  // }
});