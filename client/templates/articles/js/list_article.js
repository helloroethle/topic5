Template.listArticle.helpers({
  articles: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {submitted: -1}
    };
    return Articles.find({}, queryOptions);
  }
});