Template.baseLayout.events({
  'click #sidebar-wrapper-right .close': function () {
    Session.set('show_right_sidebar', false);
    // $('#wrapper').toggleClass('toggled-right-sidebar');
  }
});


Template.baseLayout.helpers({
  rightSidebar: function () {
    return Session.equals("show_right_sidebar", true) ? "toggled-right-sidebar" : "";
  }
});
