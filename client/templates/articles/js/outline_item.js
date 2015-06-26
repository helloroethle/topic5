Template.outlineItem.helpers({
  summary: function() {
    return this[this.meta.summary_field];
  },
  indent: function(){
    if(this.key != 'concept'){
      return 'indent';
    }
    return 'concept';
  },

});

Template.outlineItem.events({
  'click .remove-outline': function () {
    Interactions.remove(Interactions.findOne({resourceId:this.resourceId})._id);
  },
  'click div.circle' : function() {
    Session.set('add_interaction_modal_template', this.detailTemplate);
    var data = this;
    data._id = data.resourceId;
    Session.set('detailTemplateData', data);
    $('#addInteractionModal').modal();
  }
});