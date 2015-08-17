// Template.quizLayout.rendered = function () {

// };  

Template.quizLayout.helpers({
  progress: function () {
    return Session.get('progress');
  }
});
