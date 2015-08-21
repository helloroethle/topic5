Template.reviewFlashcardsSidebar.destroyed = function () {
  $("body").off('keydown');
};

Template.reviewFlashcardsSidebar.rendered = function () {
 $("body").keydown(function(e) {
    if(e.keyCode == 80){ // p - auto play
      e.preventDefault();
      setFlash('.p-shortcut');
      autoplay();
    }
    else if(e.keyCode == 82){ // r - restart
      e.preventDefault();
      setFlash('.r-shortcut');
      restart();
    }
    else if(e.keyCode == 83){ // s - shuffle
      e.preventDefault();
      setFlash('.s-shortcut');
      shuffle();
    }
    // else if(e.keyCode == 84){ // t - take quiz
    //   e.preventDefault();
    //   Router.go('takeQuiz', {'_id' : this._id});
    // } 
  }); 
};

var setFlash = function(selector){
  var $flash = $(selector).find('span.badge').addClass('flash');
  setTimeout(function(){ $flash.removeClass('flash'); }, 200);
}

var restart = function(){
  Session.set('start_time', moment().toString());
  Session.set('current_question_index', 0);
  window.flashcardOrder = _.range(0, Session.get('total_questions'));
  Session.set('shuffle_count', Session.get('shuffle_count') + 1);
}

var shuffle = function(){
  Session.set('shuffle_count', Session.get('shuffle_count') + 1);
  window.flashcardOrder = _.shuffle(window.flashcardOrder); 
  Session.set('start_time', moment().toString());
  Session.set('current_question_index', 0);    
}

var autoplay = function(){
    if(Session.get('autoPlayIntervalId') != 0){
      // stop autoplay
      clearTimeout ( Session.get('autoPlayIntervalId' ) );
      Session.set('autoPlayIntervalId', 0);
    }
    else{
      // start autoplay
      Session.set('auto_play_state', 'flip');
      var autoPlayIntervalId = setInterval (   
        function(){
          var state = Session.get('auto_play_state');
          if(state == 'flip'){
            $('.card').toggleClass('flipped');
            Session.set('auto_play_state', 'next');
          }
          else if(state == 'next'){
            $('.card').toggleClass('flipped');
            setTimeout(function(){  
               var index = Session.get('current_question_index');
               var totalQuestions = Session.get('total_questions');
                if(index + 1 < totalQuestions){
                  index += 1;
                  Session.set('current_question_index', index);
                }
              Session.set('auto_play_state', 'flip'); 
            }, 350);
            }
        }, 3500 );
      Session.set('autoPlayIntervalId', autoPlayIntervalId);
    }
}

Template.reviewFlashcardsSidebar.events({
  'click .restart':function (e, template){
    restart();
  },
  'click .shuffle':function(e, template){
    shuffle();
  },
  'click .take-quiz':function(e, template){
    Router.go('takeQuiz', {'_id' : template.data._id});
  },
  'click .auto-play':function(e, template){
    autoplay();
  },
});