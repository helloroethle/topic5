// Template.quizLayout.rendered = function () {

// };  

Template.flashcardLayout.events({
  'click #sidebar-wrapper-right .close': function () {
    Session.set('show_right_sidebar', false);
  },
});


Template.flashcardLayout.helpers({
  rightSidebar: function () {
    return Session.equals("show_right_sidebar", true) ? "toggled-right-sidebar" : "";
  }
});
