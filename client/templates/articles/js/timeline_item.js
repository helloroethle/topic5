Template.timelineItem.events({
  'click .cd-picture': function (event, Template) {
        var data = this;
        data._id = this.resourceId;
        Session.set('detailTemplateData', data);
        Session.set('add_interaction_modal_template', 'detailTimeline');
        $('#addInteractionModal').modal();
  }
});

Template.timelineItem.helpers({
  date_format: function () {
    var date = new Date(this.event_date);
    return moment(date).format('MM-DD-YYYY');
  }
});
