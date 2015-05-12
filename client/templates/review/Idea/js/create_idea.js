// First, we'll initialize the object whenever the createTopic template is created. 
Template.createIdea.created = function() {
  Session.set('quoteSubmitErrors', {});
}

Template.createIdea.helpers({
  errorMessage: function(field) {
    return Session.get('quoteSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
  }
});