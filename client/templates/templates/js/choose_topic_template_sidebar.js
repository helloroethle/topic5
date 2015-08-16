Template.chooseTopicTemplateSidebar.events({
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

    var currentTemplateId = Session.get('current_sidebar_template_id');
    Templates.update({'_id': currentTemplateId}, {
      $set: {
        topics : topics,
      }
    });
    toastr.success('Template has been assigned to topics');
  }
});

// Template.chooseTemplateArticleSidebar.created = function () {
//   console.log('when does this get called');
//     $('#wrapper').addClass('toggled-right-sidebar');
// };

Template.chooseTopicTemplateSidebar.helpers({
  myTopics: function () {
    return Topics.find();
  }
});