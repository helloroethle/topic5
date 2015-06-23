Template.articleLayout.helpers({
  whichOne: function () {
    // note that we return a string - per http://docs.meteor.com/#template_dynamic
    return Session.get('templateName');
  },
  whichData: function(){
    var resourceId = Session.get('currentResourceId');
    return Session.get(resourceId);
  }
});

Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
        e.preventDefault();
        var text = "";
        var selectionObject = {};
        var index = Session.get('highlight_index');
        var className = '.highlight-section-' + index;
        var templateName = $(e.currentTarget).find('i').attr('data-template');
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
            Session.set('highlight_start', selectionObject.anchorOffset);
            text = selectionObject.toString();
            var oldSelectionText = Session.get('highlighted_text');
            if(oldSelectionText && oldSelectionText.length > 0 && text != oldSelectionText){
               clearActiveHighlight(templateName);
               if(templateName.indexOf('timeline') > -1){
                  $('#sidebar-content form .form-control').eq(1).val(text);
               }
               else{
                  $('#sidebar-content form .form-control').first().val(text);
               }
            }
            if(!oldSelectionText || oldSelectionText.length == 0 || text != oldSelectionText){
               highlightSelection(templateName, false);
               Session.set('paragraph_start', $(className).first().parent().index());
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
    },
    'click .close, click .btn-template-close':function(e){
      clearActiveHighlight(Session.get('templateName'));
      $('.article-post').removeClass('add-highlights').removeClass('add-icons');;
    },
    'click .tag-trigger':function(e){
      $('.tag-container').toggleClass('hide');
    },
    'click .save-tags' : function(event, template){
        if($('.article-tags-input').val() != ''){
          allTags = $('.article-tags-input').val();
          this.tags = allTags;
          Articles.update(this._id, { $set: {'tags': allTags}});
        }
        $('#tagModal').modal();
    },
    'click .btn-template-delete':function(e){
      $('#wrapper').removeClass('toggled').removeClass('full');
       Session.set('templateName', '');
       Session.set('highlighted_text', '');
       var currentHighlightSelector = Session.get('currentResourceHighlightClass');
      $(currentHighlightSelector).each(function(index){
         var text = $(this).text();//get span content
         $(this).replaceWith(text);//replace all span with just content
      });
      Interactions.remove(Interactions.findOne({resourceId:this._id})._id);
    },
    'click .tag-modal-trigger':function(e){
      $('#tagModal').modal();
    },
    'click .expand':function(e){
        $('#wrapper').toggleClass('full');
    },
    'click button.overlay-close, click .show-resources':function(e){
      $('div.overlay-slide-timeline, div.overlay-slide-outline').removeClass('open');
      toggleOverlay();
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
      $('.article-post').toggleClass('add-highlights');
    },
    'mouseup .article-post.add-highlights': function(e){
      var text = window.getSelection().toString();
      if(text && text.length > 0){
         highlightSelection('hello', true);
      }
    },
    'click .add-icon':function(e){
      $('.article-post').toggleClass('add-icons');
    },
    'click .article-post.add-icons p':function(e){
      var interactionKey = Session.get('templateName').replace('create', '').toLowerCase();
      var interactionMeta = getInteractionMeta(interactionKey);
      $(e.currentTarget).append(' <i class="fa ' + interactionMeta.icon + '"></i> ');
      $('.article-post').removeClass('add-icons');
    },
    'click .highlight-section':function(e){
        $('#wrapper').addClass('toggled');
        var resourceId = $(e.currentTarget).data('resource');
        var classes = $(e.currentTarget).attr("class");
        var currentHighlightSelector = $.grep(classes.split(" "), function(v, i){
               return v.indexOf('highlight-section-') === 0;
           }).join();
        Session.set('currentResourceHighlightClass', '.' + currentHighlightSelector);
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
    }
});

function clearActiveHighlight(templateName){
   if(templateName && templateName.length > 0 && templateName.indexOf('create') > -1){
     var highlightIndex = Session.get('highlight_index');
     var classSelector = '.highlight-section-' + (highlightIndex - 1);
     $(classSelector).each(function(index){
         var text = $(this).text();//get span content
         $(this).replaceWith(text);//replace all span with just content
     });
   }
   $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
   Session.set('templateName', '');
   Session.set('highlighted_text', '');
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
    // newNode.setAttribute('data-template', detailsTemplateName);
    // newNode.setAttribute('data-toggle', 'tooltip');
    // newNode.setAttribute('data-placement', 'top');
    // newNode.setAttribute('title', 'hello');
    range.surroundContents(newNode);
}

function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a)
        for(var i = dangerous.startContainer; i != a; i = i.parentNode)
            s.push(i)
    ;
    if (0 < s.length) for(var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
        }
        else {
            xs.setStart(s[i], dangerous.startOffset);
            xs.setEndAfter(
                (s[i].nodeType == Node.TEXT_NODE)
                ? s[i] : s[i].lastChild
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
    if ((0 < s.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
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

