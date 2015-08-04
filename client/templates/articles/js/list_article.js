Template.listArticle.helpers({
  articles: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {published: -1}
    };
    // {'archived':false}
    return Articles.find({}, queryOptions);
  }
});

Template.listArticle.events({
  'click .btn-filter': function (e, template) {
    $('#wrapper').toggleClass('toggled-right-sidebar');
  }
});