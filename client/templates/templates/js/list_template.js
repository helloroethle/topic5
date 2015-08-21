Template.listTemplate.helpers({
  myTemplates: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {created: -1}
    };
    var filterQuery = {}
    var filterSearchQuery = Session.get('filter_search_query');
    if(filterSearchQuery && filterSearchQuery.length){
      // convert keyword to regular expression
      filterSearchQuery = JSON.parse(filterSearchQuery);
      console.log(filterSearchQuery);
      var keyword = filterSearchQuery.title;
      var keywordQuery = new RegExp( keyword, 'i');
      filterSearchQuery.title = keywordQuery;
      filterQuery = filterSearchQuery;
    }
    return Templates.find(filterQuery, queryOptions);
  }
});

Template.listTemplate.created = function () {
  Session.set('right_sidebar_template_name', 'listFilterTemplateSidebar');
  Session.set('show_right_sidebar', true);
};

Template.listTemplate.rendered = function () {
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-bottom-left",
    preventDuplicates: true
  };
};