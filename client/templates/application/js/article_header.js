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
Template.articleHeader.events({
  'click .app-back': function () {
    history.back();
  }
});

Template.articleHeader.helpers({
  favoriteIcon: function () {
    if(this.favorite){
      return 'fa-heart';
    }
    return 'fa-heart-o';
  }
});