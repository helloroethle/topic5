Template.outlineArticle.helpers({
  interactions: function(){
    var currentArticleId = Session.get('articleId');
    return Interactions.find({articleId:currentArticleId}, {sort: {order:1}});
  },
  noOutlines: function(){
    var currentArticleId = Session.get('articleId');
    if(Interactions.find({articleId:currentArticleId}).count() == 0){
      return true;
    }
    return false;
  }
});

Template.outlineArticle.events({
  'click .add': function () {
    Session.set('add_interaction_modal_template', 'addGrid');
    $('#addInteractionModal').modal();
  }
});