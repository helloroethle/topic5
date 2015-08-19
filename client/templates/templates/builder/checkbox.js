// Template.templateCheckbox.helpers({
//   required: function () {
//     if(this.required){
//       return 'required';
//     }
//     else{
//       return '';
//     }
//   }
// });

Template.templateCheckbox.events({
  'click .sidebar-menu-items li': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
  }
});

Template.quizCreateCheckbox.rendered = function () {
  if(this.data.answer){
    var myAnswers = this.data.answer.split(',');
    var $options = this.$('div.option-item');
    $options.each(function(index, item){
      var itemText = $(item).find('.item-checkbox-text').val();
      if(_.indexOf(myAnswers, itemText) >= 0){
        $(item).find('.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square-o');
      }
    }); 
  }
};

Template.quizCheckbox.events({
'click .prompt-answer-container li': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
    var $selected = $(e.currentTarget).parents('.prompt-answer-container').find('.fa-check-square-o');
    if($selected.length == 0){
      Session.set('current_user_answer', '');
    }
    else{
      var answers = [];
      $selected.each(function(index, item){
        answers.push($(item).parent('li').find('span').text());
      });
      Session.set('current_user_answer', answers.join());
    }
  }
})

Template.quizCheckbox.helpers({
  answers: function () {
    return this.answer.split(',');
  }
});