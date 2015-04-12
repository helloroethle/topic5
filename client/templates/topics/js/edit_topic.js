// initialize sessions when the editTopic template is created 
Template.editTopic.created = function() {
  Session.set('topicEditErrors', {});
}

Template.editTopic.helpers({
  errorMessage: function(field) {
    return Session.get('topicEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('topicEditErrors')[field] ? 'has-error' : '';
  }
});


Template.editTopic.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentTopicId = this._id;
    
    var topicProperties = {
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validateTopic(topicProperties);
    if (errors.title)
      return Session.set('topicEditErrors', errors);
    
    
    Topics.update(currentTopicId, {$set: topicProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('detailTopic', {_id: currentTopicId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this topic?")) {
      var currentTopicId = this._id;
      Topics.remove(currentTopicId);
      Router.go('listTopic');
    }
  }
});