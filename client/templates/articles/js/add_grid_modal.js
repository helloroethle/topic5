Template.addGrid.events({
  'click .add-interaction-list a': function (e) {
    e.preventDefault();
    var createTemplate = 'create' + this.value.template;
    Session.set('add_interaction_modal_template', createTemplate);
  }
});