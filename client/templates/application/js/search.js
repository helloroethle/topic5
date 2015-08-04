Template.search.helpers({
  search_term: function () {
    return Session.get('search');
  }
});