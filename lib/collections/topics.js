Topics = new Mongo.Collection('topics');

Topics.allow({
  update: function(userId, topic) { return ownsItem(userId, topic); },
  remove: function(userId, topic) { return ownsItem(userId, topic); },
});

// fieldNames array contains a list of the fields being modified
// Underscore method - without() - to return a sub-array containing the fields that are not specified
Topics.deny({
  update: function(userId, topic, fieldNames) {
    return (_.without(fieldNames, 'title').length > 0);
  }
});

// deny editing the topic unless the correct fields exists. this is a check against console manipulation.
Topics.deny({
  update: function(userId, topic, fieldNames, modifier) {
    var errors = validateTopic(modifier.$set);
    return errors.title;
  }
});

validateTopic = function (topic) {
  var errors = {};
  if (!topic.title)
    errors.title = "Please enter a title";
  return errors;
}

// More secure way of performing inserts with meteor than allow / deny logic
Meteor.methods({
  createTopic: function(topicAttributes) {
    // check types
    check(Meteor.userId(), String);
    check(topicAttributes, {
      title: String
    });

    // check existence and create error messages
    var errors = validateTopic(topicAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    // check for duplicate entry already. think about removing but keep as example for other models
    var topicWithSameTitle = Topics.findOne({title: topicAttributes.title});
    if (topicWithSameTitle) {
      return {
        topicExists: true,
        _id: topicWithSameTitle._id
      }
    }

    var user = Meteor.user();
    // underscore method - extends one object with the properties of another
    var topic = _.extend(topicAttributes, {
      userId: user._id, 
      submitted: new Date()
    });
    var topicId = Topics.insert(topic);
    return {
      _id: topicId
    };
  }
});
