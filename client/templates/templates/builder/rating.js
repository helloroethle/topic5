Template.templateRating.events({
  'click .rating .rating-bubble': function (e, template) {
    $('.rating-bubble.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
  }
});

Template.quizRating.events({
  'click .rating .rating-bubble': function (e, template) {
    $('.rating-bubble.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
  }
});