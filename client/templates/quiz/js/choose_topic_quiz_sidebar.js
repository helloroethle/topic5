// Template.chooseTopicQuizSidebar.events({
//   'click .sidebar-menu-items li label': function (e) {
//     e.preventDefault();
//     if($(e.currentTarget).find('i').hasClass('fa-square-o')){
//       $(e.currentTarget).find('i').removeClass('fa-square-o');
//       $(e.currentTarget).find('i').addClass('fa-check-square-o');
//     }
//     else{
//       $(e.currentTarget).find('i').removeClass('fa-check-square-o');
//       $(e.currentTarget).find('i').addClass('fa-square-o');
//     }
//   },
//   'click .btn-save-topic-assignment': function (e){
//     var quizTopics = [];
//     $('.sidebar-selectable .choose-topics i.fa-check-square-o').each(function ( index ) {
//       $topicItem = $(this).parent('label');
//       var title = $topicItem.text();
//       var id = $topicItem.attr('data-topic-id');
//       var topicObject = {
//         'title' : title,
//         '_id' : id
//       }
//       quizTopics.push(topicObject);
//     });
//     Session.set('quiz_topics', JSON.stringify(quizTopics));
//     toastr.success('Topic saved to quiz', 'Success!');
//     Session.set('show_right_sidebar', false);
//   }
// });

// Template.chooseTemplateArticleSidebar.created = function () {
//   console.log('when does this get called');
//     $('#wrapper').addClass('toggled-right-sidebar');
// };

Template.chooseTopicQuizSidebar.helpers({
  myTopics: function () {
    return Topics.find();
  }
});

Template.chooseTopicQuizSidebar.created = function () {
  Session.set("show_right_sidebar", true);

};