// // First, we'll initialize the object whenever the createTopic template is created. 
// Template.createFutureTopic.created = function() {
//   Session.set('quoteSubmitErrors', {});
// }

// Template.createFutureTopic.helpers({
//   errorMessage: function(field) {
//     return Session.get('quoteSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
//   }
// });

Template.createFutureTopic.rendered = function(){
  // capture the highlighted text and set as quote
  if (!this.rendered){
    if (Session.get("highlighted_text")) {
      var text = Session.get('highlighted_text');
      $("[name='topic']").val(text);
    }
    this.rendered = true;
  }
  $('.tags-input').tagsinput();
}