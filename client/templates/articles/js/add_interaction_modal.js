Template.addInteractionModal.rendered = function() {
  Session.set('add_interaction_modal_template', 'addGrid');
  Session.get('add_interaction_modal_template_label', 'Add Item');
  // $('[data-toggle="tooltip"]').tooltip();
};

Template.addInteractionModal.helpers({
  currentTemplate: function () {
    return Session.get('add_interaction_modal_template');
  },
  hiData:function (){
    return Session.get('detailTemplateData');
  },
  showBack: function(){
    if(Session.get('add_interaction_modal_template') == 'addGrid'){
      return 'hide';
    }
    else{
      return '';
    }
  }
});

Template.addInteractionModal.events({
  'click .btn-template-save' : function(e){
    console.log('add interaction modal save called');
    $('#addInteractionModal').modal('hide');
  },
  'click .btn-template-close' : function(e){
    $('#addInteractionModal').modal('hide');
  },
  'click .back' : function(e){
    e.preventDefault();
    Session.set('add_interaction_modal_template', 'addGrid');
  },
});
