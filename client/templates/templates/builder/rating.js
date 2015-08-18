Template.templateRating.events({
  'click .rating .rating-bubble': function (e, template) {
    $('.rating-bubble.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
  }
});

Template.quizRating.created = function () {
  Session.set('current_user_answer', '');
};

Template.quizRating.events({
  'click .rating .rating-bubble': function (e, template) {
    $('.rating-bubble.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
    Session.set('current_user_answer', $(e.currentTarget).text());
  }
});