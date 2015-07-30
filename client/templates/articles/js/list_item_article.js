Template.listItemArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  },
  topic_title: function (){
    return 'Topic Title';
  }
});




Template.listItemArticle.events({
  'click .delete' : function(e){
      Articles.remove(this._id);
      toastr.success('Article Successfully Deleted');
  },
  'click .pick-template' : function(e){
    // show sidebar with jquery
    Session.set('current_sidebar_article_id', this._id);
    $('#wrapper').toggleClass('toggled-right-sidebar');

  }
})
