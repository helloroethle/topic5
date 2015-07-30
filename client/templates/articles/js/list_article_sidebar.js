Template.listArticleSidebar.events({
  'click .sidebar-menu-items li': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
  },
  'click .btn-save-template-assignment': function (e){
    var pre = [];
    var post = [];
    $('.post-template-options i.fa-check-square-o').each(function ( index ) {
      $templateItem = $(this).parent('li');
      var title = $templateItem.text();
      var id = $templateItem.attr('data-template-id');
      var templateObject = {
        'title' : title,
        '_id' : id
      }
      post.push(templateObject);
    });
    $('.pre-template-options i.fa-check-square-o').each(function( index ) {
      $templateItem = $(this).parent('li');
      var title = $templateItem.text();
      var id = $templateItem.attr('data-template-id');
      var templateObject = {
        'title' : title,
        '_id' : id
      }
      pre.push(templateObject);
    });
    var currentArticleId = Session.get('current_sidebar_article_id');
    Articles.update({'_id': currentArticleId}, {
      $set: {
        preTemplates : pre,
        postTemplates : post
      }
    });
    toastr.success('Topics of the week have been added');
  }
});

Template.listArticleSidebar.helpers({
  myTemplates: function () {
    return Templates.find();
  }
});