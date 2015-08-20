Template.listArticle.helpers({
  articles: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {published: -1}
    };

    var filterQuery = {}
    var filterSearchQuery = Session.get('filter_search_query');
    if(filterSearchQuery && filterSearchQuery.length){
      // convert keyword to regular expression
      filterSearchQuery = JSON.parse(filterSearchQuery);
      var keyword = filterSearchQuery.title;
      var keywordQuery = new RegExp( keyword, 'i');
      filterSearchQuery.title = keywordQuery;
      // convert date strings to objects
      if(filterSearchQuery.toDate && filterSearchQuery.fromDate){
        var dateRangeQuery = {
          $gte: new Date(filterSearchQuery.fromDate),
          $lte: new Date(filterSearchQuery.toDate)
        }
        filterSearchQuery.published = dateRangeQuery;
        delete filterSearchQuery["fromDate"];
        delete filterSearchQuery["toDate"];
      }
      else if(filterSearchQuery.fromDate){
        var dateRangeQuery = {
          $gte: new Date(filterSearchQuery.fromDate)
        }
        filterSearchQuery.published = dateRangeQuery;
        delete filterSearchQuery["fromDate"];
      }
      filterQuery = filterSearchQuery;
    }
    // {'archived':false}
    return Articles.find(filterQuery, queryOptions);
  }
});

Template.listArticle.events({
  'click .btn-filter': function (e, template) {
    Session.set("show_right_sidebar", true);
    $('#filter').show();
    $('#right-overlay').hide();
  }
});

Template.listArticle.created = function () {
  Session.set("show_right_sidebar", true);
};

Template.listArticle.rendered = function () {
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-bottom-left",
    preventDuplicates: true
  };
};