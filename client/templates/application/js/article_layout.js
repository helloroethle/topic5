Template.articleLayout.helpers({
  whichOne: function () {
    // note that we return a string - per http://docs.meteor.com/#template_dynamic
    return Session.get('templateName');
  },
  whichData: function(){
    var resourceId = Session.get('currentResourceId');
    var interactionObject = Interactions.findOne({'resourceId': resourceId});
  
    if(resourceId && interactionObject){
      interactionObject._id = interactionObject.resourceId;
      return interactionObject;
    }
    else{
      return null;
    }
  },
  showQuiz: function(){
    var interactionKey = Session.get('templateKey');
    var interactionMeta = getInteractionMeta(interactionKey);
    if(!interactionMeta || interactionMeta.allow_question == false){
      return 'hide';
    }
  },
  activeChooseAnswer: function (){
     if(Session.get('choose_answer')){
        return 'active-icon';
     }
     return '';
  },
  activeChooseQuestion: function (){
     if(Session.get('choose_question')){
        return 'blue-active-icon';
     }
     return '';
  }
});


Template.articleLayout.rendered = function () {
  if(this.data && this.data._id){
    Session.set('articleId', this.data._id);  
    this.$('[data-toggle="tooltip"]').tooltip();
  }

};
Template.articleLayout.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};


Template.articleLayout.created = function () {
  Session.set('choose_answer', false);
  Session.set('choose_question', false);
  Session.set('templateName', '');
  Session.set('templateKey', '');
  Session.set('current_answer_key', '');
  Session.set('activeCreate', false);
  Session.set('disagree', false);
  Session.set('agree', false);
  Session.set('highlight_mode_bonanza', false);
  Session.set('manual_highlight_called', false);
  Session.set('previous_highlighted_text', '');
  Session.set('highlighted_text', '');
};

Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
        e.preventDefault();
        // initialize states and classes
        var alreadyOpen = Session.get('activeCreate');
        Session.set('current_answer_key', '');
        Session.set('manual_highlight_called', true);
        $('.article-post').removeClass('add-highlights').removeClass('add-icons');
        $('.add-highlight, .add-icon').removeClass('active');
        if(!alreadyOpen){
          Session.set('activeCreate', true);
        }
        
        // initialize variables
        var text = "";
        // var selectionObject = {};
        var index = Session.get('highlight_index');
        var className = '.highlight-section-' + index;
        var templateName = $(e.currentTarget).find('i').attr('data-template');
        Session.set('templateName', templateName);
        var templateKey = $(e.currentTarget).find('i').attr('data-key');
        Session.set('templateKey', templateKey);

        // UGLY - fix so don't have to do  this
        if(templateKey == 'disagreement'){
            Session.set('disagree', true);
            Session.set('agree', false);
        }
        else if(templateKey == 'agreement'){
            Session.set('agree', true);
            Session.set('disagree', false);
        }
        else{
            Session.set('agree', false);
            Session.set('disagree', false);
        }
        window.hltr.doHighlight();
        var oldSelectionText = Session.get('previous_highlighted_text');
        text = Session.get('highlighted_text');
        // remove old highlight if the user changes the interaction selection
        if(oldSelectionText && oldSelectionText.length > 0 && text != oldSelectionText){
           // clearCurrentHighlight();
           // set the new active highlighted text into the appropriate form input
           // should instead store the kay in jQuery data and find the interaction object summary field in the meta object
           if(templateName.indexOf('timeline') > -1){
              $('#sidebar-content form .form-control').eq(1).val(text);
           }
           else{
              $('#sidebar-content form .form-control').first().val(text);
           }
        }
        if(text.length > 0){
          index += 1;
          Session.set('highlight_index', index);
        }

        $('#wrapper').addClass('toggled').addClass('create');
        
        if(alreadyOpen){
          updateBookmarkIcon();
        }
    },
    'click .close, click .btn-template-close':function(e){
      // clearActiveHighlight(Session.get('templateName'),true);
      clearCurrentHighlight();
      closeSidebar();
      $('.interaction-icon.current').remove();
      $('.article-post').removeClass('add-highlights').removeClass('add-icons');
      Session.set('activeCreate', false);
    },
    'click .tag-trigger':function(e){
      $('.tag-container').toggleClass('hide');
    },
    'click .highlight_bonanza':function(e){
      Session.set('highlight_mode_bonanza', !Session.get('highlight_mode_bonanza'));
    },
    'click .quiz':function(e){
      $('.question-container').toggleClass('hide');
      $('.question-container').find('.control-label').toggleClass('selected-question');
    },
    'click .choose-answer':function(e){
      Session.set('choose_answer', !Session.get('choose_answer'));
    },
    'click .choose-question':function(e){
      Session.set('choose_question', !Session.get('choose_question'));
    },
    // // move to tag_modal template
    // 'click .save-tags' : function(event, template){
    //     allTags = $('.article-tags-input').val().split(',');
    //     Articles.update(this._id, { $set: {'tags': allTags}});
    //     $('#tagModal').modal('hide');
    // },
    'click .show-love' : function(event, template){
      if(this.favorite){
        $('.show-love i').removeClass('fa-heart').addClass('fa-heart-o');
      }
      else{
        $('.show-love i').removeClass('fa-heart-o').addClass('fa-heart');
      }
      Articles.update(this._id, { $set: {'favorite': !this.favorite}});
    },
    'click .btn-template-delete':function(e){
      $('#wrapper').removeClass('toggled').removeClass('full');
        Session.set('activeCreate', false);
       Session.set('templateName', '');
       Session.set('highlighted_text', '');
       var index = Session.get('currentIndex');
       var currentHighlightSelector = '.highlight-section-' + index;
      $(currentHighlightSelector).each(function(){
         var text = $(this).text();//get span content
         $(this).replaceWith(text);//replace all span with just content
      });
      $('.icon-' + index).remove();
      Interactions.remove(Interactions.findOne({resourceId:this._id})._id);
    },
    'click .tag-modal-trigger':function(e){
      Session.set('current_tag_modal_id', this._id);
      $('#tagModal').modal();
    },
    'click .expand':function(e){
        $('#wrapper').toggleClass('full');
    },
    'click button.overlay-close, click .show-resources':function(e){
      $('div.overlay-slide-timeline, div.overlay-slide-outline').removeClass('open');
      toggleOverlay();
      $('#sidebar-search input:checkbox').removeAttr('checked');
      Session.set('interactionFilterKeys', '');
    },
    'click button.overlay-slide-outline-close, click .show-outline':function(e){
      $overlayTimeline = $('div.overlay-slide-timeline');
      if($overlayTimeline.hasClass('open')){
        $overlayTimeline.removeClass('open');
        setTimeout($('div.overlay-slide-outline').addClass('open'), 1000);
      }
      else{
        $('div.overlay-slide-outline').toggleClass('open');
        $('#wrapper').toggleClass('noscroll');
      }      
    },
    'click button.overlay-slide-timeline-close, click .show-timeline':function(e){
      $overlayOutline = $('div.overlay-slide-outline');
      if($overlayOutline.hasClass('open')){
        $overlayOutline.removeClass('open');
        setTimeout($('div.overlay-slide-timeline').addClass('open'), 1000);
      }
      else{
        $('div.overlay-slide-timeline').toggleClass('open');
        $('#wrapper').toggleClass('noscroll');
      } 
    },
    'click .add-highlight':function(e){
      $('.article-post').toggleClass('add-highlights').removeClass('add-icons');
      $('.add-icon').removeClass('active');
      $('.add-highlight').toggleClass('active');
    },
    'mouseup .article-post.add-highlights': function(e){
      // clearActiveHighlight(Session.get('templateName'), false);
      clearCurrentHighlight();
      var text = window.getSelection().toString();
      if(text && text.length > 0){
         highlightSelection('hello', true);
      }
      if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
      }
      $('.article-post').removeClass('add-highlights');
      $('.add-highlight').toggleClass('active')
    },
    'click .add-icon':function(e){
      $('.article-post').toggleClass('add-icons').removeClass('add-highlights');
      $('.add-highlight').removeClass('active');
      $('.add-icon').toggleClass('active');
    },
    'click .article-post.add-icons p':function(e){
      $('.interaction-icon.current').remove();
      var interactionKey = Session.get('templateName').replace('create', '').toLowerCase();
      var interactionMeta = getInteractionMeta(interactionKey);
      var highlightIndex = Session.get('highlight_index');
      var iconClass = 'icon-' + (highlightIndex - 1);
      $(e.currentTarget).append(' <i class="interaction-icon current fa ' + interactionMeta.icon + ' ' + iconClass + '"></i> ');
      $('.article-post').removeClass('add-icons');
      $('.add-icon').removeClass('active');
    },
    'click .interaction-icon':function(e){
        var resourceId = $(e.currentTarget).data('resource');
        var index = $(e.currentTarget).data('index');
        var templateName = $(e.currentTarget).data('template');
        // var currentIconSelector = $.grep(classes.split(" "), function(v, i){
        //        return v.indexOf('icon-') === 0;
        //    }).join();
        Session.set('currentIndex', index);
        if(resourceId){
          Session.set('templateName', templateName);
          Session.set('currentResourceId', resourceId);
          $('#wrapper').addClass('toggled');
        }
    },
    'click .highlight-section':function(e){
        $('#wrapper').addClass('toggled');
        var selectedClass = 'current-selected-highlight';
        var index = $(e.currentTarget).data('index');
        $('.' + selectedClass).removeClass(selectedClass);
        $('.highlight-section-' + index).addClass(selectedClass);
        var resourceId = $(e.currentTarget).data('resource');
        // var classes = $(e.currentTarget).attr("class");
        // var currentHighlightSelector = $.grep(classes.split(" "), function(v, i){
        //        return v.indexOf('highlight-section-') === 0;
        //    }).join();
        Session.set('currentIndex', index);
        if(resourceId){
           // check to make sure it isn't the current open document
           var index = Session.get('highlight_index');
           var className = 'highlight-section-' + index;
           if( !$(e.currentTarget).hasClass(className) ){
               var templateName = $(e.currentTarget).data('template');
               Session.set('templateName', templateName);
           }
           Session.set('currentResourceId', resourceId);
        }
    },
    // 'click a.toggle-nav': function(e){
    //   e.preventDefault();
    //   console.log('clicked');
    //   $('#wrapper').toggleClass('toggled');
    //   if($('#wrapper').hasClass('toggled')){
    //     $(e.currentTarget).find('i').removeClass().addClass('fa fa-angle-right');
    //   }
    //   else{
    //     $(e.currentTarget).find('i').removeClass().addClass('fa fa-angle-left');
    //   }
    // },
    // 'focus #sidebar-content input':function(e){
    //   $(e.currentTarget).addClass('input--filled');
    // },
    'blur #sidebar-content textarea, blur #sidebar-content input':function(e){
      var input = $(e.currentTarget);
      if(input.val()){
        input.addClass('has-text');
      }
      else{
        input.removeClass('has-text');
      }
    },
    'click #sidebar-content .form-control': function(e){
      if(Session.get('choose_answer')){
        var key = $(e.currentTarget).attr('data-schema-key');
        if(key && key != ''){
          Session.set('current_answer_key', key); 
          Session.set('choose_answer', false);
          $('#sidebar-content .control-label.selected-answer').removeClass('selected-answer');
          $(e.currentTarget).parents('.form-group').find('.control-label').addClass('selected-answer');
        }
      }
      else if(Session.get('choose_question')){
        var key = $(e.currentTarget).attr('data-schema-key');
        if(key && key != ''){
          Session.set('current_question_key', key); 
          Session.set('choose_question', false);
          $('#sidebar-content .control-label.selected-answer').removeClass('selected-question');
          $(e.currentTarget).parents('.form-group').find('.control-label').addClass('selected-question');
        }
      }

    }
});

function updateBookmarkIcon(){
  var $icon = $('.interaction-icon.current');
  var $paragraph = $icon.parent('p');
  $icon.remove();
  var interactionKey = Session.get('templateName').replace('create', '').toLowerCase();
  var interactionMeta = getInteractionMeta(interactionKey);
  var highlightIndex = Session.get('highlight_index');
  var iconClass = 'icon-' + (highlightIndex - 1);
  $paragraph.append(' <i class="interaction-icon current fa ' + interactionMeta.icon + ' ' + iconClass + '"></i> ');
}

function clearCurrentHighlight(){
  var $currentHighlight = $('.current-highlight');
  $currentHighlight.each(function(){
    window.hltr.removeHighlights(this);
  });
}

function closeSidebar(){
    $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
    Session.set('templateName', '');
    Session.set('highlighted_text', '');
    $('.current-selected-highlight').removeClass('current-selected-highlight');
}

// function clearActiveHighlight(templateName, closeSidebar){
//    if(templateName && templateName.length > 0 && templateName.indexOf('create') > -1){
//      var highlightIndex = Session.get('highlight_index');
//      var classSelector = '.highlight-section-' + (highlightIndex - 1);
//      $(classSelector).each(function(index){
//          var offset = $(this).data('offset');
//          var text = $(this).text();//get span content
//          $(this).replaceWith(text).data('offset', offset);//replace all span with just content
//      });
//    }
//    if(closeSidebar){
//       $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
//       Session.set('templateName', '');
//       Session.set('highlighted_text', '');
//    }
// }


function toggleOverlay() {
   var $container = $('#wrapper'),
      $overlay = $('div.overlay' );
   if($overlay.hasClass('open')){
      $overlay.removeClass('open');
      $container.removeClass('overlay-open');
      $container.removeClass('noscroll');
   }
   else{
      $overlay.addClass('open');
      $container.addClass('overlay-open');
      if($container.hasClass('noscroll') == false){
        $container.addClass('noscroll');
      }
   }
}

