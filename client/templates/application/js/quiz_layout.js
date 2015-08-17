// Template.quizLayout.rendered = function () {

// };  

Template.quizLayout.events({
  'click #sidebar-wrapper-right .close': function () {
    Session.set('show_right_sidebar', false);
    // $('#wrapper').toggleClass('toggled-right-sidebar');
  },
});


Template.quizLayout.helpers({
  rightSidebar: function () {
    return Session.equals("show_right_sidebar", true) ? "toggled-right-sidebar" : "";
  }
});


Template.quizLayout.helpers({
  progress: function () {
    return Session.get('progress');
  }
});
