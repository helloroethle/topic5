Meteor.publish('singleTopic', function(topicId) {
  check(topicId, String);

  return Topics.find({_id: topicId});
});

Meteor.publish('topics', function() {
  if (this.userId) {
    return Topics.find({userId: this.userId}, {limit:5});
  } else {
    this.ready();
  }
});