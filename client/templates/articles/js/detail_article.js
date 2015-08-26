Template.detailArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  }
});


Template.detailArticle.rendered = function () {
  var articleTextElement = document.getElementById('article-text');
  var hltr = new TextHighlighter(articleTextElement, {
      onBeforeHighlight: function (range) {
        if(Session.get('highlight_mode_bonanza')){
          return true;
        }
        Session.set('highlighted_text', range);
        return false;
      },
      // pulls highlight index from article layout setting it
      onAfterHighlight: function (range, highlights) {
        _.each(highlights, function(item){
          $(item).attr('data-id', 568);
        });
        console.log(hltr.serializeHighlights());
        Session.set('highlight_serialization', hltr.serializeHighlights());
      },
      // onRemoveHighlight: function (hl) {
      //   console.log(h1.innerText);
      //   return true;
      // }
  });
  var savedSerialization = Session.get('highlight_serialization');
  console.log(savedSerialization);
  if(savedSerialization && savedSerialization.length > 0){
    console.log('serialization called');
    hltr.deserializeHighlights(savedSerialization);
  }
};