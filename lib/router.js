Router.configure({
  layoutTemplate: 'baseLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404',
  waitOn: function() { 
    Meteor.subscribe('templates');
    Meteor.subscribe('topics');
    Meteor.subscribe('articles');
    Meteor.subscribe('interactions');
    Meteor.subscribe('allTopics');
    Meteor.subscribe('quizes');
    return Meteor.subscribe('topicsThisWeek');
  }
});

Router.route('/', {
  name: 'home'
});

Router.route('/search', {
  name: 'search'
});

Router.route('/this-week', {
  name: 'thisWeekTopic',
  yieldTemplates: {
  'thisWeekSidebar': {to: 'sidebar-right'}
  }
})
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
  yieldTemplates: {
    'listArticleSidebar': {to: 'sidebar-right'}
  },
  data: function() { return Topics.findOne(this.params._id); }
});

Router.route('/topics/:_id/edit', {
  name: 'editTopic',
  data: function() { return Topics.findOne(this.params._id); }
});

// Articles
Router.route('/articles', {
  name: 'listArticle',
  yieldTemplates: {
    'listArticleSidebar': {to: 'sidebar-right'}
  }
});

Router.route('/browse', {
  name: 'browseArticle'
})

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

Router.route('/templates/take/:_id', {
  name: 'previewTemplate',
  data: function() { return Templates.findOne(this.params._id); }
});


// Router.route('/templates/new/preview', {
//   name: 'previewTemplate'
// });

Router.route('/templates/new2', {
  name: 'createTemplate2',
});

Router.route('/templates/list/:_id', {
  name: 'detailListTemplate',
  data: function() { return this.params._id; }
});

Router.route('/templates/:_id', {
  name: 'detailTemplate',
  layoutTemplate: 'templateLayout',
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



