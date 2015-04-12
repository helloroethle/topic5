Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404',
  waitOn: function() { 
    return Meteor.subscribe('topics');
  }
});

Router.route('/', {
  name: 'home'
})
// Topics
Router.route('/topics', {
  name: 'listTopic'
});

Router.route('/topics/new', {
  name: 'createTopic'
});

Router.route('/topics/:_id', {
  name: 'detailTopic',
  data: function() { return Topics.findOne(this.params._id); }
});

Router.route('/topics/:_id/edit', {
  name: 'editTopic',
  data: function() { return Topics.findOne(this.params._id); }
});


// Helpers
var requireLogin = function() {
  if (! Meteor.user()) {
    // fix for flash of access denied if user is currently logging in
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}


// Hooks
// A hook intercepts the routing process and potentially changes the action that the router takes
Router.onBeforeAction('dataNotFound', {only: 'detailTopic'});
Router.onBeforeAction(requireLogin, {only: 'createTopic'});



