Template.timelineArticle.rendered = function(){
  Session.set('timelineCount', 0);
  // first initialization
  Tracker.autorun(_.bind(function(){
    Session.get('timelineCount');
    Tracker.afterFlush(_.bind(function(){
      timelineInit();
    },this));
  },this));
}


function interactions(){
    var currentFilters = Session.get('interactionFilterKeys');
    var queryOptions = {};
    if(currentFilters && currentFilters.length > 0){
      var queryOptions = {
         key: { $in: [ currentFilters.split(',') ] }
      };
    }
    all_interactions = Interactions.find(queryOptions);
    // console.log('rerun this interactions');
    return all_interactions;
}

Template.timelineArticle.helpers({
  timelines: function(){
    return Interactions.find({key:'timeline'});
  }
});


function timelineInit(){
    console.log('timeline is being initialized');
    // var $timeline_block = $('.cd-timeline-block');

    // //hide timeline blocks which are outside the viewport
    // $timeline_block.each(function(){
    //   if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
    //     $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    //   }
    // });

    // //on scolling, show/animate timeline blocks when enter the viewport
    // $(window).on('scroll', function(){
    //   $timeline_block.each(function(){
    //     if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
    //       $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    //     }
    //   });
    // });
}

