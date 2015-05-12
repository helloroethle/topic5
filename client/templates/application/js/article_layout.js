Template.articleLayout.events({
    'click #sidebar-nav li a': function(e) {
      e.preventDefault();
      // if($('#wrapper').hasClass('toggled')){
      //   $('#wrapper').removeClass('toggled');
      //   $('#sidebar-content').empty();
      // }
      // else{
        $('#wrapper').addClass('toggled');
        $('#sidebar-content').empty();
        var templateName = $(e.currentTarget).find('i').attr('data-template');
        Blaze.render(Template[templateName], $('#sidebar-content').get(0));
      // }
    },
    // 'click a.toggle-nav': function(e){
    //   e.preventDefault();
    //   console.log('clicked');
    //   $('#wrapper').toggleClass('toggled');
    //   if($('#wrapper').hasClass('toggled')){
    //     $(e.currentTarget).find('i').removeClass().addClass('fa fa-angle-right');
    //   }
    //   else{
    //     $(e.currentTarget).find('i').removeClass().addClass('fa fa-angle-left');
    //   }
    // },
    // 'focus #sidebar-content input':function(e){
    //   $(e.currentTarget).addClass('input--filled');
    // },
    'blur #sidebar-content input':function(e){
      var input = $(e.currentTarget);
      if(input.val()){
        input.parent('span').addClass('input--filled');
      }
      else{
        input.parent('span').removeClass('input--filled');
      }
    }
});
