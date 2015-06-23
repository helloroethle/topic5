Template.outlineArticle.helpers({
  concepts: function(){
    return Interactions.find().fetch()[0].interactions;
  },
  topics: function() {
    return Topics.find({});
  },
  interactions: function(){
    return Interactions.find();
  },
});

Template.outlineArticle.created = function () {
  // var interactions2 = this.subscribe('interactions2');
};

Template.outlineArticle.events({
  'click .add': function () {
    Session.set('add_interaction_modal_template', 'addGrid');
    $('#addInteractionModal').modal();
  }
});