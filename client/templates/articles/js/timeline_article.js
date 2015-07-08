Template.timelineArticle.helpers({
  timelines: function(){
    var currentArticleId = Session.get('articleId');
    return Interactions.find({key:'timeline', articleId:currentArticleId});
  }
});




