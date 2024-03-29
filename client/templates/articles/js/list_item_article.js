Template.listItemArticle.helpers({
  published_clean: function () {
    var date = new Date(this.published);
    return moment(date).format('MM-DD-YYYY');
  },
  topic_title: function (){
    if(this.topics && this.topics.length > 0){
      return this.topics[0].title;
    }
    else{
      return '';
    }
  },
  has_template: function(){
    if(this.preTemplates && this.preTemplates.length > 0){
      return true;
    }
    else if(this.postTemplates && this.postTemplates.length > 0){
      return true;
    }
    return false;
  },
  favoriteIcon: function () {
    if(this.favorite){
      return 'fa-heart';
    }
    return 'fa-heart-o';
  }
});

Template.listItemArticle.rendered = function () {
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.listItemArticle.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};


Template.listItemArticle.events({
  'click .delete' : function(e){
    // show modal for confirmation
      Articles.remove(this._id);
      toastr.success('Article Successfully Deleted');
  },
  'click .show-love' : function(event, template){
    if(this.favorite){
      template.$('.show-love i').removeClass('fa-heart').addClass('fa-heart-o');
    }
    else{
      template.$('.show-love i').removeClass('fa-heart-o').addClass('fa-heart');
    }
    Articles.update(this._id, { $set: {'favorite': !this.favorite}});
  },
  'click .archive' : function(event, template){
    Articles.update(this._id, { $set: {'archived': !this.archived}});
  },
  'click .pick-template' : function(e){
    // show sidebar with jquery
    Session.set('articleSidebarTemplateName', 'chooseTemplateArticleSidebar');
    Session.set('current_selected_article', this);
    Session.set('current_sidebar_article_id', this._id);
    Session.set("show_right_sidebar", true);
    $("#filter").hide();
    $('#right-overlay').show();
  },
  'click .pick-topic, click .highlighted-topic' : function(e){
    Session.set('articleSidebarTemplateName', 'chooseTopicArticleSidebar');
    Session.set('current_selected_article', this);
    Session.set('current_sidebar_article_id', this._id);
    Session.set("show_right_sidebar", true);
    $("#filter").hide();
    $('#right-overlay').show();
  },
  'click .tag-modal-trigger':function(e){
    Session.set('current_selected_article', this);
    Session.set('current_tag_modal_id', this._id);
    $('#tagModal').modal();
  },
})
