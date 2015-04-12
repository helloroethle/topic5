Template.createTopic.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var topic = {
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validateTopic(topic);
    if (errors.title)
      return Session.set('topicSubmitErrors', errors);

    // it's better to keep our event handlers simple and, if we are doing more than the most basic inserts or updates to collections, use a Method.
    Meteor.call('createTopic', topic, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.topicExists)
        throwError('This topic has already been created');

      Router.go('detailTopic', {_id: result._id});  
    });
  }
});

// First, we'll initialize the object whenever the createTopic template is created. 
Template.createTopic.created = function() {
  Session.set('topicSubmitErrors', {});
}

Template.createTopic.helpers({
  errorMessage: function(field) {
    return Session.get('topicSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('topicSubmitErrors')[field] ? 'has-error' : '';
  }
});