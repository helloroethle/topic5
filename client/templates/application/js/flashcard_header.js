Template.flashcardHeader.events({
  'click .app-back': function () {
    history.back();
  }
});

Template.flashcardHeader.rendered = function () {
  var initials = 'jrustin';
  $('.initial').initial({name:initials, color:'#fff', textColor:'#0087F7', fontWeight:700, width:34,height:34,fontSize:16,charCount:2});
};