Template.quizTimeline.helpers({
  date_format: function () {
    var date = new Date(this.event_date);
    return moment(date).format('MM/DD/YYYY');
  }
});

Template.quizTimeline.rendered = function () {
  $('.datepicker').datepicker();
};