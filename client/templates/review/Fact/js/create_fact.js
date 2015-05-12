// // First, we'll initialize the object whenever the createTopic template is created. 
// Template.createFact.created = function() {
//   Session.set('quoteSubmitErrors', {});
// }

// Template.createFact.helpers({
//   errorMessage: function(field) {
//     return Session.get('quoteSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
//   }
// });

AutoForm.debug();