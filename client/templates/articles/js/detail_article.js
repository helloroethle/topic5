Template.detailArticle.rendered = function() {
  $('[data-toggle="tooltip"]').tooltip();
  Session.set('highlight_index', 1);
};

Template.detailArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  }
});
