// Template.articleHeader.events({
//   'click .show-resources': function(e) {
//     console.log('called show resources in article header');
//       toggleOverlay();
//   }
// });

// function toggleOverlay() {
//    var $container = $('#wrapper'),
//       $overlay = $('div.overlay' );
//    if($overlay.hasClass('open')){
//       $overlay.removeClass('open');
//       $container.removeClass('overlay-open');
//    }
//    else{
//       $overlay.addClass('open');
//       $container.addClass('overlay-open');
//    }
// }
Template.articleHeader.rendered = function () {
  var initials = 'jrustin';
  $('.initial').initial({name:initials, color:'#fff', textColor:'#0087F7', fontWeight:700, width:34,height:34,fontSize:16,charCount:2});
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.articleHeader.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};

Template.articleHeader.events({
  'click .app-back': function () {
    history.back();
  },
  'click .delete-highlights': function(){
    window.hltr.removeHighlights();
    Articles.update({'_id': Session.get('articleId')},
    {$set : { highlights : '' } });
    Session.set('highlight_index', 1);
  }
});

Template.articleHeader.helpers({
  favoriteIcon: function () {
    if(this.favorite){
      return 'fa-heart';
    }
    return 'fa-heart-o';
  },
  highlightIcon: function () {
    if(Session.get('highlight_mode_bonanza')){
      return 'fa-pencil-square';
    }
    return 'fa-pencil-square-o';
  }

});