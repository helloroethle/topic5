QuizHistories = new Meteor.Collection("quizHistories");
QuizHistories.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function (){
    return true;
  },
});

// - created, correct, incorrect, articleId, userId