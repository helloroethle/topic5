Template.listReview.helpers({
  quizes: function() {
    var queryOptions = {
      sort: {created: -1}
    };
    var filterQuery = {}
    var filterSearchQuery = Session.get('filter_search_query');
    if(filterSearchQuery && filterSearchQuery.length){
      // convert keyword to regular expression
      filterSearchQuery = JSON.parse(filterSearchQuery);
      var keyword = filterSearchQuery.title;
      var keywordQuery = new RegExp( keyword, 'i');
      filterSearchQuery.title = keywordQuery;
      filterQuery = filterSearchQuery;
    }
    return Quizes.find(filterQuery, queryOptions);
  },
  articles: function() {
    var queryOptions = {
      sort: {created: -1}
    };
    return Article.find({});
  }
});

Template.listReview.created = function () {
  Session.set('right_sidebar_template_name', 'listFilterQuizSidebar');
  Session.set('show_right_sidebar', true);
};