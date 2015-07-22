Router.configure({
  layoutTemplate: 'baseLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404',
  waitOn: function() { 
    return Meteor.subscribe('templates');
    return Meteor.subscribe('topics');
    return Meteor.subscribe('articles');
    return Meteor.subscribe('interactions');
    return Meteor.subscribe('allTopics');
    return Meteor.subscribe('quizes');
  }
});

Router.route('/', {
  name: 'home'
});

// Topics
Router.route('/topics', {
  name: 'listTopic'
});

Router.route('/topics/new', {
  name: 'createTopic'
});

// Settings
Router.route('/settings', {
  name: 'detailSettings'
});


Router.route('/topics/:_id', {
  name: 'detailTopic',
  data: function() { return Topics.findOne(this.params._id); }
});

Router.route('/topics/:_id/edit', {
  name: 'editTopic',
  data: function() { return Topics.findOne(this.params._id); }
});

// Articles
Router.route('/articles', {
  name: 'listArticle'
});

Router.route('/articles/new', {
  name: 'createArticle'
});

Router.route('/articles/:_id', {
  name: 'detailArticle',
  layoutTemplate: 'articleLayout',
  data: function() { return Articles.findOne(this.params._id); }
});

// Templates
Router.route('/templates', {
  name: 'listTemplate'
});

Router.route('/templates/new', {
  name: 'createTemplate',
  layoutTemplate: 'templateLayout',
});

Router.route('/templates/new2', {
  name: 'createTemplate2',
});

Router.route('/templates/:_id', {
  name: 'detailTemplate',
  data: function() { return Templates.findOne(this.params._id); }
});

// Quizes
Router.route('/quizes', {
  name: 'listQuizes'
});

Router.route('/quiz/new', {
  name: 'createQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'createSidebar': {to: 'sidebar'}
    }
});

Router.route('/quiz/edit/:_id', {
  name: 'editQuiz',
  layoutTemplate: 'quizLayout',
  data: function() { return Quizes.findOne(this.params._id); }
});

Router.route('/quiz/article/:_id', {
  name: 'takeQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'takeQuizSidebar': {to: 'sidebar'}
  },
  data: function() { 
    return { 
      articleId : this.params._id,
      questions : Interactions.find({articleId: this.params._id, quiz: true}).fetch()
    } 
  }
});

// Learn
Router.route('/learn', {
  name: 'learnHome'
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



