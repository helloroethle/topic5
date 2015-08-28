Template.detailArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  }
});

Template.detailArticle.created = function () {
  // Session.set('highlight_index',0);
};

Template.detailArticle.rendered = function () {
  var articleTextElement = document.getElementById('article-text');
  window.hltr = new TextHighlighter(articleTextElement, {
      highlightedClass : 'highlight-section current-highlight',
      onBeforeHighlight: function (range) {
        if(Session.get('highlight_mode_bonanza')){
          return true;
        }
        if(Session.get('manual_highlight_called')){
          Session.set('manual_highlight_called', false);
          Session.set('previous_highlighted_text', Session.get('highlighted_text'));
          Session.set('highlighted_text', range.toString());
          // cleanup previous highlight since the user never saved it and left the sidebar open
          if(!Session.equals('highlighted_text', Session.get('previous_highlighted_text'))){
            console.log('delete previous current says hello');
            var $currentHighlight = $('.current-highlight');
            $currentHighlight.each(function(){
              window.hltr.removeHighlights(this);
            });
          }

          if(range.toString().length > 0){
            return true;  
          }
          return false;
        }
        return false;
      },
      // pulls highlight index from article layout setting it
      onAfterHighlight: function (range, highlights) {
        if(Session.get('highlight_mode_bonanza')){
          _.each(highlights, function(item){
            $(item).removeClass('current-highlight');
          })
          Articles.update({'_id': Session.get('articleId')},
            {$set : { highlights : window.hltr.serializeHighlights() } });
        }
        else{
          var index = Session.get('highlight_index');
          var highlight_section_class = 'highlight-section-' + index;
          _.each(highlights, function(item){
            // check first if the section already has been highlighted
            if(item.className.indexOf('highlight-section-') == -1){
              $(item).addClass(highlight_section_class);
              $(item).attr('data-index', index);
            }
            //.addClass('current-highlight');
            if(Session.get('disagree')){
                $(item).addClass('highlight-disagree');
            }
            else if(Session.get('agree')){
                $(item).addClass('highlight-agree');
            }
          });
        }
        // Session.set('highlight_serialization', window.hltr.serializeHighlights());
      },
      // onRemoveHighlight: function (hl) {
      //   console.log(h1.innerText);
      //   return true;
      // }
  });

  if(this.data && this.data.highlights && this.data.highlights.length > 0){
    window.hltr.removeHighlights();
    window.hltr.deserializeHighlights(this.data.highlights);
  }
};