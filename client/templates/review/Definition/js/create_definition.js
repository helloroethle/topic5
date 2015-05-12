// First, we'll initialize the object whenever the createTopic template is created. 
Template.createDefinition.created = function() {
  Session.set('quoteSubmitErrors', {});
}

Template.createDefinition.helpers({
  errorMessage: function(field) {
    return Session.get('quoteSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
  }
});