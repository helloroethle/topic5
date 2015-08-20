Template.reviewFlashcardsSidebar.helpers({
  questionsCorrect: function () {
    return Session.get('current_questions_correct');
  },
  questionsIncorrect: function (){
    return Session.get('current_questions_incorrect');
  },
  questionsRemaining: function (){
    return Session.get('current_questions_remaining');
  },
});

Template.reviewFlashcardsSidebar.events({
  'click .restart':function (e, template){
    Session.set('start_time', moment().toString());
    Session.set('current_question_index', 0);
    window.flashcardOrder = _.range(0, Session.get('total_questions'));
    Session.set('shuffle_count', Session.get('shuffle_count') + 1);
  },
  'click .shuffle':function(e, template){
    Session.set('shuffle_count', Session.get('shuffle_count') + 1);
    window.flashcardOrder = _.shuffle(window.flashcardOrder); 
    Session.set('start_time', moment().toString());
    Session.set('current_question_index', 0);    
  },
  'click .take-quiz':function(e, template){
    Router.go('takeQuiz', {'_id' : template.data._id});
  },
  'click .auto-play':function(e, template){
    console.log('hey oh');
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
            console.log('flip called');
          }
          else if(state == 'next'){
            $('.card').toggleClass('flipped');
             var index = Session.get('current_question_index');
             var totalQuestions = Session.get('total_questions');
              if(index + 1 < totalQuestions){
                index += 1;
                Session.set('current_question_index', index);
              }
            Session.set('auto_play_state', 'flip');
            console.log('next called')
            }
        }, 3500 );
      Session.set('autoPlayIntervalId', autoPlayIntervalId);
    }

  },
});