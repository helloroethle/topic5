Template.listInteractions.rendered = function(){
  this.CBPGridGallery = new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
  // first initialization
  Tracker.autorun(_.bind(function(){
    interactions().count();
    Tracker.afterFlush(_.bind(function(){
      if(Session.get('interactionFilterKeys') == 'hello'){
        Session.set('interactionFilterKeys', '');
      }
      else{
        console.log('gallery reinitialized');
        this.CBPGridGallery._init();
      }
    },this));
  },this));

}

function interactions(){
    var currentFilters = Session.get('interactionFilterKeys');
    var queryOptions = {};
    if(currentFilters && currentFilters.length > 0){
      var queryOptions = {
         key: { $in: currentFilters.split(',') }
      };
    }
    all_interactions = Interactions.find(queryOptions);
    // console.log('rerun this interactions');
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

