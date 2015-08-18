Template.templateMultipleChoice.events({
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

Template.quizMultipleChoice.events({
'click .prompt-answer-container li': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-circle-o')){
      $(e.currentTarget).find('i').removeClass('fa-circle-o');
      $(e.currentTarget).find('i').addClass('fa-check-circle-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-circle-o');
      $(e.currentTarget).find('i').addClass('fa-circle-o');
    }
    Session.set('current_user_answer', $(e.currentTarget).find('span').text());
  }
});