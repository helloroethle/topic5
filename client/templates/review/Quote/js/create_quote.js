// First, we'll initialize the object whenever the createTopic template is created. 
// Template.createQuote.created = function() {
//   Session.set('quoteSubmitErrors', {});
// }

Template.createQuote.rendered = function(){
  // capture the highlighted text and set as quote
  if (!this.rendered){
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    $('#quote').val(text);
    $('#quote').parent('span').addClass('input--filled');
    this.rendered = true;
  }
}

// Template.createQuote.helpers({
//   errorMessage: function(field) {
//     return Session.get('quoteSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
//   }
// });
