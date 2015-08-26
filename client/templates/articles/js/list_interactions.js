Template.listInteractions.rendered = function(){
  this.CBPGridGallery = new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
  // first initialization
  Tracker.autorun(_.bind(function(){
    // interactions().count();
    Session.get('interactionFilterKeys');
    Tracker.afterFlush(_.bind(function(){
      if(Session.get('interactionFilterKeys') == 'hello'){
        Session.set('interactionFilterKeys', '');
      }
      else{
        // console.log('gallery reinitialized');
        this.CBPGridGallery._init();
      }
    },this));
  },this));

}

function interactions(){
    var currentFilters = Session.get('interactionFilterKeys');
    var currentArticleId = Session.get('articleId');
    var queryOptions = {articleId:currentArticleId};
    if(currentFilters && currentFilters.length > 0){
      var queryOptions = {
         key: { $in: [ currentFilters.split(',') ] },
         articleId: currentArticleId
      };
    }
    all_interactions = Interactions.find(queryOptions);
    return all_interactions;
}

Template.listInteractions.helpers({
  interactions: interactions,
  empty_interaction_items: function(){
    return interactions().count() == 0;
  }
});

Template.listInteractions.events({
  'change #sidebar-search input': function (e) {
    var key = $(e.currentTarget).attr('name');
    var filters = Session.get('interactionFilterKeys');
    if(!filters || filters.length == 0){
      filters = key;
    }
    else if(filters.indexOf(key) > -1){
      filters = filters.replace((key + ','), '');
      filters = filters.replace(key, '');
    }
    else{
      filters = filters + ',' + key;
    }
    Session.set('interactionFilterKeys', filters);
},
  'click .btn-template-delete': function(e, tpl) {
       tpl.CBPGridGallery._closeSlideshow();
  }
})

