Template.createNote.rendered = function(){
  // capture the highlighted text and set as quote
  if (Session.get("highlighted_text")) {
    var text = Session.get('highlighted_text');
    $("[name='note']").val(text).addClass('has-text');
  }
  $('.tags-input').tagsinput();

}