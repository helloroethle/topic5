function interactions(){
    var currentFilters = Session.get('interactionFilterKeys');
    var queryOptions = {};
    if(currentFilters && currentFilters.length > 0){
      var queryOptions = {
         key: { $in: [ currentFilters.split(',') ] }
      };
    }
    all_interactions = Interactions.find(queryOptions);
    // console.log('rerun this interactions');
    return all_interactions;
}

Template.listInteractionOverlay.helpers({
  interactions: interactions,
  myData : function(){
    var data = this;
    data._id = data.resourceId;
    return data;
  }
});


