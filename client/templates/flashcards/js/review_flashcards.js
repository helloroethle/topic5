window.flashcardOrder = [];

Template.reviewFlashcards.events({
  'click .card': function (e, template) {
    flip();
  },
  'click .arrow-right':function (e, template){
    right();
  },
  'click .arrow-left': function (e, template){
    left();
  }
});



Template.reviewFlashcards.created = function () {
  Session.set('current_question_index', 0);
  Session.set('show_right_sidebar', false);
  Session.set('start_time', moment().toString());
  Session.set('autoPlayIntervalId', 0);
  Session.set('shuffle_count', 0);
  if(this.data && this.data.questions){
    Session.set('total_questions', this.data.questions.length);
    window.flashcardOrder = _.range(0, this.data.questions.length);
  }
  else{
    Session.set('total_questions', 0);
  }
  
};

var setFlash = function(selector){
  var $flash = $(selector).find('span.badge').addClass('flash');
  setTimeout(function(){ $flash.removeClass('flash'); }, 200);
}

var left = function(){
  var index = Session.get('current_question_index');
  if(index > 0){
    index -= 1;
    Session.set('current_question_index', index);
  }
}

var right = function(){
 var index = Session.get('current_question_index');
 var totalQuestions = Session.get('total_questions');
  if(index + 1 < totalQuestions){
    index += 1;
    Session.set('current_question_index', index);
  }
}

var flip = function(){
  $('.card').toggleClass('flipped');
}

Template.reviewFlashcards.rendered = function () {
  $("body").keydown(function(e) {
    if(e.keyCode == 32) { // spacebar - flip
      e.preventDefault();
      setFlash('.spacebar-shortcut');
      flip();
    }
    else if(e.keyCode == 37) { // left - previous
      e.preventDefault();
      setFlash('.left-shortcut');
      left();
    }
    else if(e.keyCode == 39) { // right - next
      e.preventDefault();
      setFlash('.right-shortcut');
      right();
    }
  }); 
};

Template.reviewFlashcards.destroyed = function () {
  $("body").off('keydown');
};

Template.reviewFlashcards.helpers({
  front_text: function () {
    var index = Session.get('current_question_index');
    var shuffleCount = Session.get('shuffle_count');
    if(this.questions && this.questions.length > 0){
      return this.questions[window.flashcardOrder[index]].question;  
    }
    return '';
  },
  current_question: function (){
    return Session.get('current_question_index') + 1;
  },
  total_questions: function (){
    return Session.get('total_questions');
  },
  back_text: function(){
    var index = Session.get('current_question_index');
    var shuffleCount = Session.get('shuffle_count');
    if(this.questions && this.questions.length > 0){
      return this.questions[window.flashcardOrder[index]].answer;  
    }
    return '';
  },
  progress: function(){
    var index = Session.get('current_question_index') + 1;
    var total = Session.get('total_questions');
    var width = (index / total) * 100;
    return width;
  }
});