Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      Blaze.render(Template.createTopic, $('#sidebar-content').get(0));
    }
});