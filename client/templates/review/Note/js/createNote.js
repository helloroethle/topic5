Template.createNote.rendered = function(){
  // capture the highlighted text and set as quote
  if (!this.rendered){
    if (Session.get("highlighted_text")) {
      var text = Session.get('highlighted_text');
      $("[name='note']").val(text).addClass('has-text');
    }
    this.rendered = true;
  }
}