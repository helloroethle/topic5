Template.articleLayout.helpers({
  whichOne: function () {
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
      return false;
    }
    return true;
  },
  showAnswer: function(){
    if(Session.equals('is_quiz_question', true)){
      return true;
    }
    return false;
  },
  activeChooseAnswer: function (){
     if(Session.get('choose_answer')){
        return '';
     }
     return 'active-icon';
  },
  activeQuestion: function (){
    if(Session.equals('is_quiz_question', true)){
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
  Session.set('is_quiz_question', false);
  Session.set('templateName', '');
  Session.set('templateKey', '');
  Session.set('current_answer_key', '');
  Session.set('activeCreate', false);
  Session.set('highlight_mode_bonanza', false);
  Session.set('manual_highlight_called', false);
  Session.set('previous_highlighted_text', '');
  Session.set('highlighted_text', '');
  Session.set('highlight_delete_in_process', false);
  Session.set('free_highlights_selected', 0);
};

Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
        e.preventDefault();
        // initialize states and classes
        if(Session.equals('activeCreate', true)){ updateBookmarkIcon(); }
        else{ Session.set('activeCreate', true); }
        Session.set('is_quiz_question', false);
        // need to set so text highlighter plugin code will treat as interaction highlight and not free highlight
        Session.set('manual_highlight_called', true);
        $('.article-post').removeClass('add-icons');
        $('.add-icon').removeClass('active');
        var templateName = $(e.currentTarget).find('i').attr('data-template');
        var templateKey = $(e.currentTarget).find('i').attr('data-key');
        var interactionMeta = getInteractionMeta(templateKey);
        Session.set('templateName', templateName);
        Session.set('templateKey', templateKey);
        Session.set('currentIndex', Session.get('highlight_index'));
        window.hltr.doHighlight();
        $('#wrapper').addClass('toggled');
    },
    'click .close, click .btn-template-close':function(e){
      clearCurrentHighlight();
      closeSidebar();
    },
    'click .tag-trigger':function(e){
      $('.tag-container').toggleClass('hide');
    },
    'click .highlight_bonanza':function(e){
      Session.set('highlight_mode_bonanza', !Session.get('highlight_mode_bonanza'));
    },
    'click .quiz':function(e, template){
      Session.set('choose_answer', false);
      $('.question-container').toggleClass('hide');
      $('.question-container input').val('');
      // two states - create and detail 
      // two states within that - has question & does not
      if(Session.equals('is_quiz_question', true)){
        // hiding question field
      }
      else{
        // showing question field
        template.$('.control-label.selected-answer').removeClass('selected-answer');
        var key = '';
        var answer_key = Session.get('current_answer_key');
        if(checkExists(answer_key)){

        }
        else{
          // prep the default answer field. 
          var interactionKey = Session.get('templateKey');
          var interactionMeta = getInteractionMeta(interactionKey);
          key = interactionMeta.answer_field;  
          Session.set('current_answer_key', key);   
        }
        $('#sidebar-content [name=' + key + ']').parents('.form-group').find('.control-label').addClass('selected-answer');
      }  
      Session.set('is_quiz_question', !Session.get('is_quiz_question'));
    },
    'click .choose-answer':function(e){
      Session.set('choose_answer', !Session.get('choose_answer'));
    },
    'click .show-love' : function(event, template){
      if(this.favorite) { replaceClass('.show-love i', 'fa-heart', 'fa-heart-o'); }
      else{ replaceClass('.show-love i', 'fa-heart-o', 'fa-heart'); }
      Articles.update(this._id, { $set: {'favorite': !this.favorite}});
    },
    'click .btn-template-delete':function(e){
      // close sidebar first to give visual look of quick response
      // should show error toastr if error occurs
      var index = Session.get('currentIndex');
      var iconSelector = '.icon-' + index;
      $(iconSelector).remove();
      var currentHighlightSelector = '.highlight-section-' + index;
      removeClassHighlights(currentHighlightSelector);
      // this._id is the resource id in this context
      Interactions.remove(Interactions.findOne({resourceId:this._id})._id);
      Articles.update({'_id': Session.get('articleId')},
          {
            $set : { highlights : window.hltr.serializeHighlights() },
            $pull: { icons: {'resource':this._id} }
          }
      );
      closeSidebar();
    },
    'click .tag-modal-trigger':function(e){
      Session.set('current_tag_modal_id', this._id);
      $('#tagModal').modal();
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
    'dragover #sidebar-content .form-control':function(e){
      e.preventDefault();
    },
    'drop #sidebar-content .form-control':function(e){
        var key = $(e.currentTarget).attr('data-schema-key');
        if(key && key != ''){
          Session.set('current_answer_key', key); 
          Session.set('choose_answer', false);
          $('#sidebar-content .control-label.selected-answer').removeClass('selected-answer');
          $(e.currentTarget).parents('.form-group').find('.control-label').addClass('selected-answer');
        }  
    },
    'click .add-icon':function(e){
      $('.article-post').toggleClass('add-icons');
      $('.add-icon').toggleClass('active');
    },
    'click .article-post.add-icons p':function(e){
      console.log('debug this yo');
      var interactionKey = Session.get('templateKey');
      var interactionMeta = getInteractionMeta(interactionKey);
      var iconClass = 'icon-' + Session.get('currentIndex');
      if(Session.equals('activeCreate', true)){
        $('.interaction-icon.current').remove();
        $(e.currentTarget).append(' <i class="interaction-icon fa current ' + interactionMeta.icon + ' ' + iconClass + '"></i> ');
      }
      else{
        // just append to the new paragraph 
        if($('.' + iconClass).length > 0){
          $('.' + iconClass).appendTo(e.currentTarget);  
        }
        else{
          $(e.currentTarget).append(' <i class="interaction-icon fa ' + interactionMeta.icon + ' ' + iconClass + '"></i> ');
        }
      }
      // reset add icon state to default
      $('.article-post').removeClass('add-icons');
      $('.add-icon').removeClass('active');
      // should update the article icon array instead of having to click save on the interaction sidebar
    },
    'click .interaction-icon':function(e){
        console.log('debug interaction icon');
        var resourceId = $(e.currentTarget).data('resource');
        if(resourceId){
          Session.set('currentIndex', $(e.currentTarget).data('index'));
          Session.set('templateKey', $(e.currentTarget).data('key'));
          Session.set('templateName', $(e.currentTarget).data('template'));
          Session.set('currentResourceId', resourceId);
          $('#wrapper').addClass('toggled');
        }
    },
    'click .free-highlight':function(e){
      if($(e.currentTarget).hasClass('selected-free')){
        Session.set('free_highlights_selected', Session.get('free_highlights_selected') - 1);
      }
      else{
        Session.set('free_highlights_selected', Session.get('free_highlights_selected') + 1);
      }
      var timestamp = $(e.currentTarget).data('timestamp');
      $('.free-highlight[data-timestamp=' + timestamp + ']').toggleClass('selected-free');
    },
    'click .highlight-section':function(e){
        var currentIndex = $(e.currentTarget).data('index');
        var overallIndex = Session.get('highlight_index');
        if(currentIndex == overallIndex){
          return false;
        }
        $('#wrapper').addClass('toggled');
        var selectedClass = 'current-selected-highlight';
        $('.' + selectedClass).removeClass(selectedClass);
        $('.highlight-section-' + currentIndex).addClass(selectedClass);
        Session.set('currentIndex', currentIndex);
        Session.set('templateKey', $(e.currentTarget).data('key'));
        Session.set('templateName', $(e.currentTarget).data('template'));
        Session.set('currentResourceId', $(e.currentTarget).data('resource'));
    },
    'click #sidebar-content .form-control': function(e){
      if(Session.equals('choose_answer', true)){
        var key = $(e.currentTarget).attr('data-schema-key');
        if(checkExists(key)){
          Session.set('current_answer_key', key); 
          Session.set('choose_answer', false);
          $('#sidebar-content .control-label.selected-answer').removeClass('selected-answer');
          $(e.currentTarget).parents('.form-group').find('.control-label').addClass('selected-answer');
        }
      }
    }
});

function updateBookmarkIcon(){
  var $icon = $('.interaction-icon.current');
  var $paragraph = $icon.parent('p');
  $icon.remove();
  var interactionKey = Session.get('templateKey');
  var interactionMeta = getInteractionMeta(interactionKey);
  var highlightIndex = Session.get('highlight_index');
  var iconClass = 'icon-' + highlightIndex;
  $paragraph.append(' <i class="interaction-icon current fa ' + interactionMeta.icon + ' ' + iconClass + '"></i> ');
}

function clearCurrentHighlight(){
  removeClassHighlights('.current-highlight');
}

function closeSidebar(){
    $('#wrapper').removeClass('toggled');
    Session.set('templateName', '');
    Session.set('templateKey', '');
    Session.set('current_answer_key', '');
    Session.set('currentIndex', '')
    Session.set('highlighted_text', '');
    Session.set('activeCreate', false);
    $('.interaction-icon.current').remove();
    $('.article-post').removeClass('add-icons');
    $('.current-selected-highlight').removeClass('current-selected-highlight');
    Session.set('manual_highlight_called', false);
}

function checkExists(field){
  if(field && field.length > 0){
    return true;
  }
  return false;
}

function removeClassHighlights(selector){
  if(selector.indexOf('.') == -1){
    selector = '.' + selector;
  }
  Session.set('highlight_delete_in_process', true);
  $(selector).each(function(){
    window.hltr.removeHighlights(this);
  });
  Session.set('highlight_delete_in_process', false);
}

function replaceClass(selector, remove, add){
  // should clean parameters
  if(selector.indexOf('.') == -1){
    selector = '.' + selector;
  }
  $(selector).removeClass(remove).addClass(add);
}

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

