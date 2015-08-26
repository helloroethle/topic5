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
  // renderHighlights(this.data._id);
  if(this.data && this.data._id){
    Session.set('articleId', this.data._id);  
    this.$('[data-toggle="tooltip"]').tooltip();
  }

};

var renderHighlights = function(articleId){
  // var all_interactions = Interactions.find({highlight_length:{"$exists":true}, articleId: articleId}, {sort: {highlight_length: 1}}).fetch();
  return;
}

Template.articleLayout.destroyed = function () {
  // removeAllHighlights();
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
  // Session.set('highlight_serialization', '');
  Session.set('highlight_mode_bonanza', true);
};

Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
        e.preventDefault();
        var hello = window.highlighter.highlightSelection("current-highlight", { containerElementId: "article-text" });
        console.log(hello);
        Session.set('current_answer_key', '');
        Session.set('serialized_selection', rangy.serializeSelection());
        console.log(Session.get('serialized_selection'));
        var alreadyOpen = Session.get('activeCreate');
        $('.article-post').removeClass('add-highlights').removeClass('add-icons');
        $('.add-highlight, .add-icon').removeClass('active');
        if(!alreadyOpen){
          Session.set('activeCreate', true);
        }
        
        // initialize variables
        var text = "";
        var selectionObject = {};
        var index = Session.get('highlight_index');
        var className = '.highlight-section-' + index;
        var templateName = $(e.currentTarget).find('i').attr('data-template');
        Session.set('templateKey', $(e.currentTarget).find('i').attr('data-key'));
        // UGLY - fix so don't have to do  this
        var buttonTitle = $(e.currentTarget).data('original-title');
        if(buttonTitle.indexOf('Disagree') > -1){
            Session.set('disagree', true);
            Session.set('agree', false);
        }
        else if(buttonTitle.indexOf('Agree') > -1){
            Session.set('agree', true);
            Session.set('disagree', false);
        }
        else{
            Session.set('agree', false);
            Session.set('disagree', false);
        }

        if (window.getSelection() && window.getSelection().toString()) {
            selectionObject = window.getSelection();
            // $selectionNode = $(selectionObject.anchorNode);
            // calculate the highlight start relative to the parent paragraph tag
            // if selection is taking place within another selection
            // var previousOffset = $selectionNode.parent().data('offset');
            // console.log('parent offset');
            // console.log(previousOffset);
            // if(!previousOffset){
            //   // if selection is later than a pervious highlight
            //   previousOffset = $selectionNode.prev().data('offset');
            //   if(!previousOffset){
            //     Session.set('highlight_start', selectionObject.anchorOffset);
            //   }
            //   else{
            //     var previousLength = $selectionNode.prev().data('length');
            //     Session.set('highlight_start', selectionObject.anchorOffset + previousLength + previousOffset);
            //   }
            // }
            // else{
            //   Session.set('highlight_start', selectionObject.anchorOffset + previousOffset);
            // }
            text = selectionObject.toString();
            var oldSelectionText = Session.get('highlighted_text');
            if(oldSelectionText && oldSelectionText.length > 0 && text != oldSelectionText){
               clearActiveHighlight(templateName, false);
               // set the new active highlighted text into the appropriate form input
               // should instead store the kay in jQuery data and find the interaction object summary field in the meta object
               if(templateName.indexOf('timeline') > -1){
                  $('#sidebar-content form .form-control').eq(1).val(text);
               }
               else{
                  $('#sidebar-content form .form-control').first().val(text);
               }
            }
            // see if this can't be turned into an if else instead of two ifs
            if(!oldSelectionText || oldSelectionText.length == 0 || text != oldSelectionText){
               highlightSelection(templateName, false);
               // Session.set('paragraph_start', $(className).first().parents('p').index());
               // should have used the paragraph start instead of anchorNode from selection object to calculate
               // distance from the previous highlight offset - anchorNode is from the start of the selection so it can
               // be lower than the end highlight (focus node)
               index += 1;
               Session.set('highlight_index', index);
            }
        }
        // < IE 9 
        // } else if (document.selection && document.selection.type != "Control") {
        //     selectionObject = document.selection;
        //     text = document.selection.createRange().text;
        // }
        if(!Session.get('highlighted_text')){
            Session.set('highlighted_text', text);      
        }
        $('#wrapper').addClass('toggled').addClass('create');
        Session.set('templateName', templateName);
        if(alreadyOpen){
          updateBookmarkIcon();
        }
    },
    'click .close, click .btn-template-close':function(e){
      clearActiveHighlight(Session.get('templateName'),true);
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
      clearActiveHighlight(Session.get('templateName'), false);
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
        var resourceId = $(e.currentTarget).data('resource');
        // var classes = $(e.currentTarget).attr("class");
        var index = $(e.currentTarget).data('index');
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

function clearActiveHighlight(templateName, closeSidebar){
   if(templateName && templateName.length > 0 && templateName.indexOf('create') > -1){
     var highlightIndex = Session.get('highlight_index');
     var classSelector = '.highlight-section-' + (highlightIndex - 1);
     $(classSelector).each(function(index){
         var offset = $(this).data('offset');
         var text = $(this).text();//get span content
         $(this).replaceWith(text).data('offset', offset);//replace all span with just content
     });
   }
   if(closeSidebar){
      $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
      Session.set('templateName', '');
      Session.set('highlighted_text', '');
   }
}

function highlightSelection(templateName, isActiveHighlight) {
    var userSelection = window.getSelection().getRangeAt(0);
    var safeRanges = getSafeRanges(userSelection);
    for (var i = 0; i < safeRanges.length; i++) {
        highlightRange(safeRanges[i], templateName, isActiveHighlight);
    }
}

function highlightRange(range, templateName, isActiveHighlight) {
    var index = Session.get('highlight_index');
    if(isActiveHighlight){
      index--;
    }
    var newNode = document.createElement("span");
    // var detailsTemplateName = templateName.replace('create', 'detail');
    var classNames = 'highlight-section highlight-section-' + index;
    if(Session.get('disagree')){
        classNames = classNames + ' highlight-disagree';
    }
    else if(Session.get('agree')){
        classNames = classNames + ' highlight-agree';
    }
    newNode.setAttribute( "class", classNames );
    range.surroundContents(newNode);
}

function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var safe = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a){
      for(var i = dangerous.startContainer; i != a; i = i.parentNode){
        safe.push(i);
      }
    }
    if (0 < safe.length) for(var i = 0; i < safe.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(safe[i-1]);
            xs.setEndAfter(safe[i].lastChild);
        }
        else {
            xs.setStart(safe[i], dangerous.startOffset);
            xs.setEndAfter(
                (safe[i].nodeType == Node.TEXT_NODE)
                ? safe[i] : safe[i].lastChild
            );
        }
        rs.push(xs);
    }

    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a)
        for(var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i)
    ;
    if (0 < e.length) for(var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
            xe.setStartBefore(e[i].firstChild);
            xe.setEndBefore(e[i-1]);
        }
        else {
            xe.setStartBefore(
                (e[i].nodeType == Node.TEXT_NODE)
                ? e[i] : e[i].firstChild
            );
            xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
    }

    // Middle -- the uncaptured middle
    if ((0 < safe.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(safe[safe.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    }
    else {
        return [dangerous];
    }

    // Concat
    rs.push(xm);
    response = rs.concat(re);    

    // Send to Console
    return response;
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

