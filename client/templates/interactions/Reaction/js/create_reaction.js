// // First, we'll initialize the object whenever the createTopic template is created. 
// Template.createReaction.created = function() {
//   Session.set('quoteSubmitErrors', {});
// }

// Template.createReaction.helpers({
//   errorMessage: function(field) {
//     return Session.get('quoteSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
//   }
// });
Template.createReaction.events({
  'click .rating .rating-bubble': function (e, template) {
    $('.rating-bubble.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
  }
});

Template.createReaction.helpers({
  reaction_type: function () {
    if(Session.get('disagree')){
      return 'Disagreement';
    }
    else{
      return 'Agreement';
    }
  }
});

Template.createReaction.rendered = function(){
  // capture the highlighted text and set as quote
  if (!this.rendered){
    if (Session.get("highlighted_text")) {
      var text = Session.get('highlighted_text');
      $("[name='text']").val(text);
    }
    this.rendered = true;
  }
  $('.tags-input').tagsinput();
}