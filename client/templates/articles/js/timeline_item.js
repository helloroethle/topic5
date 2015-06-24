Template.timelineItem.events({
  'click .timeline-icon': function (event, Template) {
        Session.set('detailTemplateData', this.data);
        Session.set('add_interaction_modal_template', 'detailTimeline');
        $('#addInteractionModal').modal();
  }
});
