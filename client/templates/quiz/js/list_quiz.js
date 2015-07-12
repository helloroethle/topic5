Template.listQuizes.helpers({
  quizes: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {submitted: -1}
    };
    return Quizes.find({}, queryOptions);
  }
});