Template.takeQuiz.rendered = function () {
  Session.set('current_question_index', 0);
  Session.set('current_questions_correct', 0);
  Session.set('current_questions_incorrect', 0);
  Session.set('current_questions_remaining', this.data.questions.length);
};

Template.takeQuiz.helpers({
  questionTemplate: function () {
    var index = Session.get('current_question_index');
    console.log(this.questions[index].meta.quiz_template);
    return this.questions[index].meta.quiz_template;
  },
  questionData: function (){
    var index = Session.get('current_question_index');
    return this.questions[index];
  },
  questionIndex: function (){
    var index = Session.get('current_question_index');
    return index + 1;
  }
});

function toggleActionButtons(){
  $('.quiz-answer-button').toggle();
  $('.quiz-grade-container').toggle();
}

function nextQuestion(){
    var index = Session.get('current_question_index');
    if(Session.get('current_questions_remaining') == 0){
      return;
    }
    index += 1;
    Session.set('current_question_index', index);
}

function prevQuestion(){
    var index = Session.get('current_question_index');
    if(index == 0){
      return;
    }
    index -= 1;
    Session.set('current_question_index', index);
}

Template.takeQuiz.events({
  'click .quiz-answer-button': function (e, template) {
    var index = Session.get('current_question_index');
    var width = (index / template.data.questions.length) * 100;
    Session.set('progress', width);
    toggleActionButtons();
  },
  'click .quiz-mark-correct':function(e, template){
    Session.set('current_questions_correct', Session.get('current_questions_correct') + 1);
    Session.set('current_questions_remaining', Session.get('current_questions_remaining') - 1);
    toggleActionButtons();
    nextQuestion();
  },
  'click .quiz-mark-incorrect':function(e, template){
    Session.set('current_questions_incorrect', Session.get('current_questions_incorrect') + 1);
    Session.set('current_questions_remaining', Session.get('current_questions_remaining') - 1);
    toggleActionButtons();
    nextQuestion();
  },
  'click .quiz-prev-question':function(e, template){
    prevQuestion();
  },
  'click .quiz-next-question':function(e, template){
    nextQuestion();
  }
});