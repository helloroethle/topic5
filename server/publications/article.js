Meteor.publish('singleArticle', function(articleId) {
  check(articleId, String);

  return Articles.find({_id: articleId});
});

Meteor.publish('articles', function() {
  return Articles.find({}, {sort: { published: -1 }});
});