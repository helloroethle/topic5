Template.quizMCQuiz.helpers({
  answer_label: function () {
    return this.choices[this.answer];
  }
});

Template.quizMCQuiz.events({
  'click .sidebar-menu-items li': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-circle-o')){
      $(e.currentTarget).find('i').removeClass('fa-circle-o');
      $(e.currentTarget).find('i').addClass('fa-check-circle-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-circle-o');
      $(e.currentTarget).find('i').addClass('fa-circle-o');
    }
  }
});