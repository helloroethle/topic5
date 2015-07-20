Template.listTopic.helpers({
  topics: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {title: 1}
    };
    var keyword = Session.get('topic_search_query');
    var query = new RegExp( keyword, 'i') ;
    return Topics.find({'title': query}, queryOptions);
  }
});

Template.listTopic.created = function () {
  Session.set('topic_search_query', '');
};

Template.listTopic.events({
  'keyup .topic-search': function(e){
    Session.set('topic_search_query', e.currentTarget.value);
  },
  'keypress .add-topic': function(e) {
    if(e.which === 13){
      var topic = {
        title: $('.add-topic').val()
      };
    var errors = validateTopic(topic);
    if (errors.title){
      console.log(errors);
      return false;
    }

    // it's better to keep our event handlers simple and, if we are doing more than the most basic inserts or updates to collections, use a Method.
    Meteor.call('createTopic', topic, function(error, result) {
      // display the error to the user and abort
      if (error){
        console.log(error);
        // return throwError(error.reason);
      }
      else{
        console.log('success');
        console.log(result);
        $('.add-topic').val('').focus();
      }
        


      // show this result but route anyway
      // if (result.topicExists)
      //   throwError('This topic has already been created');

      // Router.go('detailTopic', {_id: result._id});  
    });
    }
  }
});
