Template.tagModal.rendered = function(){
  $('.article-tags-input').tagsinput();
  Tracker.autorun(function () {
    Session.get('current_tag_modal_id');
    Tracker.afterFlush(function(){
      $('.article-tags-input').tagsinput('destroy');
      $('.article-tags-input').tagsinput();
    });
  });
}


Template.tagModal.events({
  'click .save-tags' : function(event, template){
      var currentArticleId = Session.get('current_tag_modal_id');
      if(currentArticleId == ''){
        // this is an object not created yet - save in session 
        Session.set('current_tags', $('.article-tags-input').val());
      }
      else{
        allTags = $('.article-tags-input').val().split(',');
        Articles.update(currentArticleId, { $set: {'tags': allTags}});  
      }
      $('#tagModal').modal('hide');
  }
});

Template.tagModal.helpers({
  article_tags: function () {
    if(Session.get('current_tag_modal_id') == ''){
      return '';
    }
    var currentArticleId = Session.get('current_tag_modal_id');
    var article = Articles.findOne({_id: currentArticleId});
    if(article && article.tags){
      return article.tags.join();
    }
    return '';
  }
});