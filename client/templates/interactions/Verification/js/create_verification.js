// // First, we'll initialize the object whenever the createTopic template is created. 
// Template.createVerification.created = function() {
//   Session.set('quoteSubmitErrors', {});
// }

// Template.createVerification.helpers({
//   errorMessage: function(field) {
//     return Session.get('quoteSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
//   }
// });

Template.createVerification.rendered = function(){
    if (Session.get("highlighted_text")) {
      var text = Session.get('highlighted_text');
      $("[name='text']").val(text);
    }
    $('.tags-input').tagsinput();
}