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
    var interactionKey = Session.get('templateName').replace('create', '').toLowerCase();
    var interactionMeta = getInteractionMeta(interactionKey);
    if(interactionMeta.allow_question == false){
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
  renderHighlights(this.data._id);
  Session.set('articleId', this.data._id);
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.articleLayout.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};


Template.articleLayout.created = function () {
  Session.set('choose_answer', false);
  Session.set('choose_question', false);
};


function renderHighlights(articleId){
  var all_interactions = Interactions.find({highlight_length:{"$exists":true}, articleId: articleId}, {sort: {highlight_length: 1}}).fetch();
  var paragraph_highlight_builder = [];
  var myIndex = 0;
  var paragraph_starts = [];
  var paragraph_length_aggregate = 0;
  $('.article-post p').each(function() {
    paragraph_starts.push(paragraph_length_aggregate);
    paragraph_length_aggregate += $(this).text().length;
  });
  _.each(all_interactions, function(interaction){
    if(interaction && interaction.highlight_length > 0){
      var start_paragraph = interaction.paragraph_start;
      var start_highlight = interaction.highlight_start + paragraph_starts[start_paragraph];
      var end_highlight = interaction.highlight_length + start_highlight;
      if(paragraph_highlight_builder.length > 0){
        // get list of start overlap. current -> [5,10], item -> [3,7],
        // start of current in range of another and end is not
        // result should be [7,10]
        var start_overlap = _.filter(paragraph_highlight_builder,function(item){
          return (start_highlight >= item.start_highlight && start_highlight < item.end_highlight)
        });
        // get list of end overlap. current -> [5,10], item -> [7,14],
        // end of current in range of another and start is not
        // result should be [5,7]
        var end_overlap = _.filter(paragraph_highlight_builder,function(item){
          return (end_highlight > item.start_highlight && end_highlight <= item.end_highlight)
        });

        if(start_overlap.length > 0){
          var max_start_overlap = _.max(start_overlap, function(overlap){ return overlap.end_highlight; });
          if(max_start_overlap.end_highlight > 0){
            start_highlight = max_start_overlap.end_highlight;
          }
        }
        if(end_overlap.length > 0){
          var min_end_overlap = _.min(end_overlap, function(overlap){ return overlap.start_highlight; });
          if(min_end_overlap.start_highlight > 0){
            end_highlight = min_end_overlap.start_highlight;
          }
        }
        // get list of overlap with new acceptable range. current -> [5,10], item -> [4, 11]
        // result should be [4,5] & [10,11]
        // this will need to be refactored for multiple range breaks
        var total_overlap = _.filter(paragraph_highlight_builder, function(item){
          return (start_highlight <= item.start_highlight && end_highlight >= item.end_highlight);
        });
        if(total_overlap.length > 0){
          var min_start_overlap = _.min(total_overlap, function(overlap){ return overlap.start_highlight; });
          var max_end_overlap = _.max(total_overlap, function(overlap){ return overlap.end_highlight; });
          if(min_start_overlap.start_highlight == start_highlight && max_end_overlap.end_highlight == end_highlight){
            // range is already taken
            return;
          }
          var updated = false;
          // break start range first
          if(start_highlight < min_start_overlap.start_highlight){
            paragraph_highlight_builder.push({
              'start_highlight': start_highlight,
              'end_highlight': min_start_overlap.start_highlight,
              'index': myIndex,
              'resource': interaction.resourceId,
              'template': interaction.detailTemplate,
              'label': interaction.meta.label,
            }); 
            updated = true;
          }
          if(end_highlight > max_end_overlap.end_highlight){
            paragraph_highlight_builder.push({
              'start_highlight': max_end_overlap.end_highlight,
              'end_highlight': end_highlight,
              'index': myIndex,
              'resource': interaction.resourceId,
              'template': interaction.detailTemplate,
              'label': interaction.meta.label
            }); 
            updated = true;
          }
          if(updated){
            myIndex+=1;
            return;
          }
        }
        if(start_highlight < end_highlight){
          paragraph_highlight_builder.push({
            'start_highlight': start_highlight,
            'end_highlight': end_highlight,
            'index': myIndex,
            'resource': interaction.resourceId,
            'template': interaction.detailTemplate,
            'label': interaction.meta.label
          });    
          myIndex+=1;
          return;   
        }
      }
      else{
        paragraph_highlight_builder.push({
          'start_highlight': start_highlight,
          'end_highlight': end_highlight,
          'index': myIndex,
          'resource': interaction.resourceId,
          'template': interaction.detailTemplate,
          'label': interaction.meta.label
        });
        myIndex+=1;
      }
    }
  });
  paragraph_highlight_builder = _.sortBy(paragraph_highlight_builder, function(item){ return -item.end_highlight; });
  _.each(paragraph_highlight_builder, function(item){
    renderHighlight(item, paragraph_starts);
    console.log('[' + item.start_highlight + ', ' + item.end_highlight + ',' + (item.end_highlight - item.start_highlight).toString() + ']');
  });
  for(i = 0; i < myIndex; i++){
    var item = _.find(paragraph_highlight_builder, function(item){ return item.index == i; })
    console.log(item.start_highlight);
    console.log(item.end_highlight - item.start_highlight);
    $('.highlight-section-' + item.index).data('resource', item.resource).data('template', item.template).data('index', item.index);
  }
  // $('body').tooltip({
  //   selector: '.highlight-section'
  // });

  Session.set('highlight_index', myIndex);
  // $(document).on('keyup', function (e) {
  //   if (e.keyCode == 27) console.log('esc pressed');   // esc
  // });
  
}


function renderHighlight(interaction, paragraph_starts){
  if(interaction && paragraph_starts){
    // find paragraph start
    var highlight_start_total = interaction.start_highlight;
    var highlight_end_total = interaction.end_highlight;
    var index = 0;
    // get starting paragraph index
    for (i = 0; i <= paragraph_starts.length; i++) { 
      if(highlight_start_total < paragraph_starts[i]){
        index = i - 1;
        break;
      }
      if(i == paragraph_starts.length ){
        index = i - 1;
      }
    }

    var highlight_length = interaction.end_highlight - interaction.start_highlight;
    var highlight_start = highlight_start_total - paragraph_starts[index];
    var iteration = 0;
    while(highlight_length > 0 || iteration == 1000){
      var $paragraph = $('.article-post p:eq(' + index + ')');
      var paragraph_length = $paragraph.text().length;
      var start = 0; 
      var end = paragraph_length;
      if(iteration == 0){
        start = highlight_start;
        if( (paragraph_length - highlight_start) > highlight_length){
          end = highlight_start + highlight_length;
        }
      }
      else if(paragraph_length > highlight_length){
        end = highlight_length;
      }
      renderParagraph($paragraph, start, end, interaction.index, interaction.label);
      iteration++;
      index++;
      highlight_length -= paragraph_length;
    }
  }
  return false;
}

function renderParagraph(paragraph, start, end, index, label){
    var html = paragraph.html();
    html = html.substring(0, start) +
           "<span data-length = '" + (end-start) + "' data-offset='" + start + "' title='" + label + "' class='highlight-section highlight-section-" + index + "'>" +
           html.substring(start, end) +
           "</span>" +
           html.substring(end);
    paragraph.html(html);
}

Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
        e.preventDefault();
        Session.set('current_answer_key');
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
            $selectionNode = $(selectionObject.anchorNode);
            // calculate the highlight start relative to the parent paragraph tag
            // if selection is taking place within another selection
            var previousOffset = $selectionNode.parent().data('offset');
            console.log('parent offset');
            console.log(previousOffset);
            if(!previousOffset){
              // if selection is later than a pervious highlight
              previousOffset = $selectionNode.prev().data('offset');
              if(!previousOffset){
                Session.set('highlight_start', selectionObject.anchorOffset);
              }
              else{
                var previousLength = $selectionNode.prev().data('length');
                Session.set('highlight_start', selectionObject.anchorOffset + previousLength + previousOffset);
              }
            }
            else{
              Session.set('highlight_start', selectionObject.anchorOffset + previousOffset);
            }
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
            if(!oldSelectionText || oldSelectionText.length == 0 || text != oldSelectionText){
               highlightSelection(templateName, false);
               Session.set('paragraph_start', $(className).first().parents('p').index());
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
            Session.set('selection_object', selectionObject);       
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

