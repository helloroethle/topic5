Template.detailArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  }
});
