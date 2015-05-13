Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
        e.preventDefault();
        var text = "";
        var selectionObject = {};
        var templateName = $(e.currentTarget).find('i').attr('data-template');
        if (window.getSelection() && window.getSelection().rangeCount) {
            selectionObject = window.getSelection();
            text = window.getSelection().toString();
            highlightSelection(templateName);
            var index = Session.get('highlight_index');
            index += 1;
            Session.set('highlight_index', index);
        }
        // } else if (document.selection && document.selection.type != "Control") {
        //     selectionObject = document.selection;
        //     text = document.selection.createRange().text;
        // }

        Session.set('highlighted_text', text);
        Session.set('selection_object', selectionObject);
      // if($('#wrapper').hasClass('toggled')){
      //   $('#wrapper').removeClass('toggled');
      //   $('#sidebar-content').empty();
      // }
      // else{
        $('#wrapper').addClass('toggled');
        $('#sidebar-content').empty();
        Blaze.render(Template[templateName], $('#sidebar-content').get(0));
      // }
    },
    'click .close':function(e){
      $('#wrapper').removeClass('toggled');
      $('#sidebar-content').empty();
    },
    'click .highlight-section':function(e){
        var templateName = $(e.currentTarget).attr('data-template');
        Blaze.render(Template[templateName], $('#sidebar-content').get(0));
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

function highlightSelection(templateName) {
    var userSelection = window.getSelection().getRangeAt(0);
    var safeRanges = getSafeRanges(userSelection);
    for (var i = 0; i < safeRanges.length; i++) {
        highlightRange(safeRanges[i], templateName);
    }
}

function highlightRange(range, templateName) {
    var index = Session.get('highlight_index');
    var newNode = document.createElement("div");
    var detailsTemplateName = templateName.replace('create', 'detail');
    var classNames = 'highlight-section highlight-section-' + index;
    newNode.setAttribute( "class", classNames );
    newNode.setAttribute('data-template', detailsTemplateName);
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
