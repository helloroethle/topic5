Template.listItemReview.events({
  'click .delete' : function(e){
      Quizes.remove(this._id);
      toastr.success('Quiz Successfully Deleted');
  },
  'click .pick-topic' : function(e){
    Session.set('right_sidebar_template_name', 'chooseTopicQuizSidebar');
    Session.set('current_sidebar_template_id', this._id);
    Session.set("show_right_sidebar", true);
  },

})

Template.listItemReview.rendered = function () {
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.listItemReview.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};
