// First, we'll initialize the object whenever the createTopic template is created. 
// Template.createFlashCard.created = function() {
//   Session.set('quoteSubmitErrors', {});
// }

// Template.createFlashCard.helpers({
//   errorMessage: function(field) {
//     return Session.get('quoteSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
//   }
// });

// Template.createFlashCard.rendered = function(){
//   // capture the highlighted text and set as quote
//   if (!this.rendered){
//       console.log('hello rendered flashcard');
//       $(".card").flip({
//         axis: "y",
//         reverse: true,
//         trigger: "click"
//       });
//     this.rendered = true;
//   }
// }


// Template.createFlashCard.events({
//   'click .flip': function(e){
//     e.preventDefault();
//     $(e.currentTarget).find('.card').flip();
//   } 
// })

Template.createFlashCard.rendered = function(){
  // capture the highlighted text and set as quote
  if (!this.rendered){
    if (Session.get("highlighted_text")) {
      var text = Session.get('highlighted_text');
      $("[name='front_text']").val(text);
    }
    this.rendered = true;
  }
  $('.tags-input').tagsinput();
}