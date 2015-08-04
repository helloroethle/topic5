Template.tagModal.rendered = function(){
  $('.article-tags-input').tagsinput();
  Tracker.autorun(function () {
    Session.get('current_tag_modal_id');
    console.log('what up tag modal autorun');
    Tracker.afterFlush(function(){
      console.log('what up after flush');
      $('.article-tags-input').tagsinput('destroy');
      $('.article-tags-input').tagsinput();
    });
  });
}


Template.tagModal.events({
  'click .save-tags' : function(event, template){
      var currentArticleId = Session.get('current_tag_modal_id');
      allTags = $('.article-tags-input').val().split(',');
      Articles.update(currentArticleId, { $set: {'tags': allTags}});
      $('#tagModal').modal('hide');
  }
});

Template.tagModal.helpers({
  article_tags: function () {
    var currentArticleId = Session.get('current_tag_modal_id');
    var article = Articles.findOne({_id: currentArticleId});
    if(article && article.tags){
      return article.tags.join();
    }
    return '';
  }
});