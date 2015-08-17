Template.quizHeader.events({
  'click .app-back': function () {
    history.back();
  },
  'click .show-topics': function (){
    Session.set('show_right_sidebar', !Session.get('show_right_sidebar'));
    Session.set('right_sidebar_template_name', 'chooseTopicQuizSidebar');
  },
  'click .tag-modal-trigger':function(e){
    Session.set('current_tag_modal_id', '');
    $('#tagModal').modal();
  }
});

Template.quizHeader.rendered = function () {
  var initials = 'jrustin';
  $('.initial').initial({name:initials, color:'#fff', textColor:'#0087F7', fontWeight:700, width:34,height:34,fontSize:16,charCount:2});
};

Template.quizHeader.helpers({
  detailQuiz: function () {
    return Session.get('is_detail_quiz');
  },
  favoriteIcon: function () {
    if(this.favorite){
      return 'fa-heart';
    }
    return 'fa-heart-o';
  },
});