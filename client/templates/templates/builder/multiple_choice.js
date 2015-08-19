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

Template.quizCreateMultipleChoice.rendered = function () {
  if(this.data.answer){
    var myAnswer = this.data.answer;
    var $options = this.$('div.option-item');
    $options.each(function(index, item){
      var itemText = $(item).find('.item-option-text').val();
      if(myAnswer == itemText){
        $(item).find('.fa-circle-thin').removeClass('fa-circle-thin').addClass('fa-check-circle-o');
        return;
      }
    }); 
  }
};

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