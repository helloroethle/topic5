Template.header.rendered = function () {
  var initials = 'jrustin';
  $('.initial').initial({name:initials, color:'#fff', textColor:'#0087F7', fontWeight:700, width:34,height:34,fontSize:16,charCount:2});
};

Template.header.events({
  'submit #search': function (e) {
    e.preventDefault();
    Session.set('search', $('#search input').val());
    $('#search input').val('');
    Router.go('search');
  }
});