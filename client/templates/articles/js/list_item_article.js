Template.listItemArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  }
});


Template.listItemArticle.events({
  'click .delete' : function(e){
      Articles.remove(this._id);
  }
})