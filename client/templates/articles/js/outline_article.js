Template.outlineArticle.helpers({
  interactions: function(){
    return Interactions.find({}, {sort: {order:1}});
  },
  noOutlines: function(){
    if(Interactions.find().count() == 0){
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