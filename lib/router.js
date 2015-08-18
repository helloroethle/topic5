Router.configure({
  layoutTemplate: 'baseLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404',
  waitOn: function() { 
    return [
    Meteor.subscribe('thisWeeks'),
    Meteor.subscribe('templates'),
    Meteor.subscribe('topics'),
    Meteor.subscribe('articles'),
    Meteor.subscribe('interactions'),
    // Meteor.subscribe('allTopics'),
    Meteor.subscribe('quizes')]
  }
});

Router.route('/', {
  name: 'home',
  template: 'listArticle',
  yieldTemplates: {
    'listArticleSidebar': {to: 'sidebar-right'}
  }

  // template: 'thisWeekTopic',
  // yieldTemplates: {
  //   'thisWeekSidebar': {to: 'sidebar-right'}
  // }
});

Router.route('/search', {
  name: 'search'
});

Router.route('/this-week', {
  name: 'thisWeekTopic',
  yieldTemplates: {
  'thisWeekSidebar': {to: 'sidebar-right'}
  }
});

Router.route('/this-week/calendar', {
  name: 'calendar',
  template: 'calendar'
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
  name: 'listTemplate',
  yieldTemplates: {
    'listSidebar': {to: 'sidebar-right'},
    'chooseTemplateArticleOverlay': {to: 'overlay-slide'}
  }
});

Router.route('/templates/new', {
  name: 'createTemplate',
  yieldTemplates: {
    'listSidebar': {to: 'sidebar-right'},
  },
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
  name: 'listQuizes',
  yieldTemplates: {
    'listSidebar': {to: 'sidebar-right'}
  }
});

Router.route('/quiz/new', {
  name: 'createQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'createQuizSidebar': {to: 'sidebar'},
    'listSidebar': {to: 'sidebar-right'}
  }
});

// Router.route('/quiz/:_id', {
//   name: 'detailQuiz',
//   layoutTemplate: 'quizLayout',
//   yieldTemplates: {
//     'createQuizSidebar': {to: 'sidebar'},
//     'listSidebar': {to: 'sidebar-right'}
//     },
//   data: function() { return Quizes.findOne(this.params._id); }
// });

Router.route('/quiz/edit/:_id', {
  name: 'detailQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'createQuizSidebar': {to: 'sidebar'},
    'listSidebar': {to: 'sidebar-right'}
    },
  data: function() { return Quizes.findOne(this.params._id); }
});


Router.route('/quiz/topic/:_id', {
  name: 'takeTopicQuiz',
  template: 'takeQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'takeQuizSidebar': {to: 'sidebar'}
  },
  data: function() { 
    var topicId = this.params._id;
    var articleIds = Articles.find( {'topics._id': topicId} , {_id : 1});
    var articleArrayIds = _.map(articleIds.fetch(), function(item){ return item._id; });
    var interactions = Interactions.find({ articleId: { $in: articleArrayIds }, quiz: true });
    return { 
      topic : Topics.findOne({_id: topicId }),
      questions : interactions.fetch()
    } 
  }
});

Router.route('/quiz/this-week/:_thisWeekId/topic/:_id', {
  name: 'takeThisWeekTopicQuiz',
  template: 'takeQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'takeQuizSidebar': {to: 'sidebar'}
  },
  // waitOn: function(){
  //   return [Meteor.subscribe('thisWeeks'),
  //          Meteor.subscribe('topics'),
  //          Meteor.subscribe('articles'),
  //          Meteor.subscribe('interactions')];
  // },
  data: function() { 
    var thisWeekId = this.params._thisWeekId;
    var topicId = this.params._id;
    var thisWeekObject = ThisWeeks.findOne(thisWeekId);
    var articleIds = Articles.find({
      'topics._id': topicId,
      published: {
        $gte: new Date(thisWeekObject.startDate),
        $lte: new Date(thisWeekObject.endDate)
      }},{ _id : 1});
    var articleArrayIds = _.map(articleIds.fetch(), function(item){ return item._id; });
    var interactions = Interactions.find({
      articleId: { $in: articleArrayIds },
      quiz: true
    });
    return { 
      thisWeekId : this.params.thisWeekId,
      topic : Topics.findOne({_id: topicId }),
      questions : interactions.fetch()
    } 
  }
});

Router.route('/quiz/this-week/:_id', {
  name: 'takeThisWeekQuiz',
  template: 'takeQuiz',
  layoutTemplate: 'quizLayout',
  yieldTemplates: {
    'takeQuizSidebar': {to: 'sidebar'}
  },
  data: function() { 
    var thisWeekId = this.params._id;
    var thisWeekObject = ThisWeeks.findOne({_id: thisWeekId });
    var topicIds =  _.map(thisWeekObject.topics, function(item){ return item._id; });
    var articleIds = Articles.find({
      'topics._id': { $in: topicIds },
      published: {
        $gte: new Date(thisWeekObject.startDate),
        $lte: new Date(thisWeekObject.endDate)
      }}, { _id : 1});
    var articleArrayIds = _.map(articleIds.fetch(), function(item){ return item._id; });
    var interactions = Interactions.find({
      articleId: { $in: articleArrayIds },
      quiz: true
    });
    return { 
      thisWeekId : this.params.thisWeekId,
      topics : topicIds,
      questions : interactions.fetch()
    } 
  }
});

Router.route('/quiz/article/:_id', {
  name: 'takeArticleQuiz',
  template: 'takeQuiz',
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

Router.route('/quiz/:_id', {
  name: 'takeQuiz',
  template: 'takeQuiz',
  layoutTemplate: 'quizLayout',
  // waitOn: function() {  return [Meteor.subscribe('quizes')]; },
  // loadingTemplate: 'loading',
  yieldTemplates: { 'takeQuizSidebar' : {to: 'sidebar'} },
  data: function(){
    var quiz = Quizes.findOne(this.params._id);
    return {
      questions: quiz.questions
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



