// First, we'll initialize the object whenever the createTopic template is created. 
Template.createFutureTopic.created = function() {
  Session.set('quoteSubmitErrors', {});
}

Template.createFutureTopic.helpers({
  errorMessage: function(field) {
    return Session.get('quoteSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
  }
});