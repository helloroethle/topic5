ArticleHistories = new Meteor.Collection("articleHistories");
ArticleHistories.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function (){
    return true;
  },
});

// - created, pre template, post template, articleId, userId