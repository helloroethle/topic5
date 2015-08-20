Template.reviewFlashcards.events({
  'click .card': function (e, template) {
    $(e.currentTarget).toggleClass('flipped');
  }
});

Template.reviewFlashcards.created = function () {
  Session.set('current_question_index', 0);
  Session.set('show_right_sidebar', false);
  if(this.data && this.data.questions){
    Session.set('total_questions', this.data.questions.length);
  }
  else{
    Session.set('total_questions', 0);
  }
  
};

Template.reviewFlashcards.rendered = function () {
  $("body").keydown(function(e) {
    if(e.keyCode == 32) { // spacebar
      e.preventDefault();
      $('.card').toggleClass('flipped');
    }
    else if(e.keyCode == 37) { // left
      console.log(Session.get('current_question_index'));
      var index = Session.get('current_question_index');
      if(index > 0){
        index -= 1;
        Session.set('current_question_index', index);
      }
    }
    else if(e.keyCode == 39) { // right
      console.log(Session.get('current_question_index'));
     var index = Session.get('current_question_index');
     var totalQuestions = Session.get('total_questions');
      if(index < totalQuestions){
        index += 1;
        Session.set('current_question_index', index);
      }
    }
  }); 
};

Template.reviewFlashcards.destroyed = function () {
  $("body").off('keydown');
};

Template.reviewFlashcards.helpers({
  front_text: function () {
    var index = Session.get('current_question_index');
    console.log(this.questions.length);
    if(this.questions && this.questions.length > 0){
      return this.questions[index].question;  
    }
    return '';
  },
  back_text: function(){
    var index = Session.get('current_question_index');
    if(this.questions && this.questions.length > 0){
      return this.questions[index].answer;  
    }
    return '';
  }
});