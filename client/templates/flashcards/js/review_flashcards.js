Template.reviewFlashcards.events({
  'click .card': function (e, template) {
    $(e.currentTarget).toggleClass('flipped');
  }
});

Template.reviewFlashcards.rendered = function () {
  $("body").keydown(function(e) {
    if(e.keyCode == 32) { // spacebar
      e.preventDefault();
      $('.card').toggleClass('flipped');
    }
  }); 
};