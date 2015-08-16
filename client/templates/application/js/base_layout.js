Template.baseLayout.events({
  'click #sidebar-wrapper-right .close': function () {
    Session.set('show_right_sidebar', false);
    // $('#wrapper').toggleClass('toggled-right-sidebar');
  },
  'click button.overlay-slide-outline-close':function(e){
    $('#wrapper').toggleClass('noscroll'); 
    $('div.overlay-slide-outline').toggleClass('open');
  },
});


Template.baseLayout.helpers({
  rightSidebar: function () {
    return Session.equals("show_right_sidebar", true) ? "toggled-right-sidebar" : "";
  }
});
