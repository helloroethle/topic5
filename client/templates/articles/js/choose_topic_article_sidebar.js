Template.chooseTopicArticleSidebar.events({
  'click .sidebar-menu-items li label': function (e) {
    e.preventDefault();
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
  },
  'click .btn-save-topic-assignment': function (e){
    var topics = [];
    $('.sidebar-selectable .choose-topics i.fa-check-square-o').each(function ( index ) {
      $topicItem = $(this).parent('label');
      var title = $topicItem.text();
      var id = $topicItem.attr('data-topic-id');
      var topicObject = {
        'title' : title,
        '_id' : id
      }
      topics.push(topicObject);
    });

    var currentArticleId = Session.get('current_sidebar_article_id');
    Articles.update({'_id': currentArticleId}, {
      $set: {
        topics : topics,
      }
    });
    toastr.success('Topics have been assigned');
  }
});

// Template.chooseTemplateArticleSidebar.created = function () {
//   console.log('when does this get called');
//     $('#wrapper').addClass('toggled-right-sidebar');
// };

Template.chooseTopicArticleSidebar.helpers({
  myTopics: function () {
    return Topics.find();
  }
});