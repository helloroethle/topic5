Template.listTopic.helpers({
  topics: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {submitted: -1}
    };
    return Topics.find({}, queryOptions);
  }
});