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

Template.takeQuiz.events({
  'click .quiz-answer-button': function () {
    var index = Session.get('current_question_index');
    index += 1;
    Session.set('current_question_index', index);
  }
});