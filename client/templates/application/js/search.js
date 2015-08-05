Template.search.helpers({
  search_term: function () {
    return Session.get('search');
  }
});

Template.search.created = function () {
  Session.set('show_right_sidebar', false);
};