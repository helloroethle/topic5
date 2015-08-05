Template.detailTopic.helpers({
  topicArticles: function () {
    return Articles.find({'topics._id' : this._id});
  }
});

Template.detailTopic.rendered = function () {
  $('#filter').hide();
  Session.set('show_right_sidebar', false);
};