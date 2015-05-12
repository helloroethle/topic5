// First, we'll initialize the object whenever the createTopic template is created. 
Template.createConcept.created = function() {
  Session.set('quoteSubmitErrors', {});
}

Template.createConcept.helpers({
  errorMessage: function(field) {
    return Session.get('quoteSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
  }
});