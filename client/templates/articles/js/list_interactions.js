// Template.listInteractions.helpers({
//   interactions: function() {
//     // sort in submitted decending order
//     var resourceIds = [];
//     $('.highlight-section').each(function(){
//       var resourceId = $(this).data('resource');
//       if(resourceIds.indexOf(resourceId) > -1){
//         resourceIds.push(resourceId); 
//       }
//     });
//     var interactions = [];
//     for (i = 0; i < resourceIds.length; i++) { 
//       interactions.push(Session.get(resourceIds[i]));
//     }
//     return interactions;
//   }
// });

Template.listInteractions.helpers({
  interactions: function() {
    var currentFilters = Session.get('interactionFilterKeys');
    var queryOptions = {};
    if(currentFilters && currentFilters.length > 0){
      var queryOptions = {
         key: { $in: [ currentFilters.split(',') ] }
      };
    }
    return Interactions.find(queryOptions);
    // return Interactions.find();
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
      filters = filters.replace(key, '');
      filters = filters.replace(',,', ',');
    }
    else{
      filters = filters + ',' + key;
    }
    console.log(filters);
    Session.set('interactionFilterKeys', filters);
}
})

