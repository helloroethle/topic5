// First, we'll initialize the object whenever the createTopic template is created. 
Template.createConfusion.created = function() {
  Session.set('quoteSubmitErrors', {});
}

Template.createConfusion.helpers({
  errorMessage: function(field) {
    return Session.get('quoteSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('quoteSubmitErrors')[field] ? 'has-error' : '';
  }
});