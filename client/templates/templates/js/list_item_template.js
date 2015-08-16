Template.listItemTemplate.events({
  'click .delete' : function(e){
      Templates.remove(this._id);
      toastr.success('Template Successfully Deleted');
  },
  'click .show-love' : function(event, template){
    if(this.defaultTemplate){
      template.$('.show-love i').removeClass('fa-heart').addClass('fa-heart-o');
    }
    else{
      template.$('.show-love i').removeClass('fa-heart-o').addClass('fa-heart');
    }
    Templates.update(this._id, { $set: {'defaultTemplate': !this.defaultTemplate}});
  },
  'click .pick-topic' : function(e){
    Session.set('right_sidebar_template_name', 'chooseTopicTemplateSidebar');
    Session.set('current_sidebar_template_id', this._id);
    Session.set("show_right_sidebar", true);
    // $('#right-overlay').show();
  },
  'click .pick-article':function(e){
    $('div.overlay-slide-outline').toggleClass('open');
    setTimeout($('#wrapper').toggleClass('noscroll'), 3000);
  },
})

Template.listItemTemplate.helpers({
  favoriteIcon: function () {
    if(this.defaultTemplate){
      return 'fa-heart';
    }
    return 'fa-heart-o';
  }
});