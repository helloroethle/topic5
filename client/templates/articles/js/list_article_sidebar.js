Template.listArticleSidebar.helpers({
  whichOne: function () {
    // note that we return a string - per http://docs.meteor.com/#template_dynamic
    return Session.get('articleSidebarTemplateName');
  },
  myTags : function () {
    if(Session.get('tag_search_query') != ''){
      var filterBy = Session.get('tag_search_query');
      var myFullList = Template.instance().my_tags.get();
      var myFilteredTags = _.filter(myFullList, function(tag) {
        // `~` with `indexOf` means "contains"
        return ~tag._id.toLowerCase().indexOf(filterBy);
      });
      return myFilteredTags;
    }
    return Template.instance().my_tags.get();
  },
   topics: function (){
    // sort in submitted decending order
    var queryOptions = {
      sort: {title: 1}
    };
    var keyword = Session.get('topic_search_query');
    var query = new RegExp( keyword, 'i') ;
    return Topics.find({'title': query}, queryOptions);
   }
})


Template.listArticleSidebar.events({
  'keyup #topic-search':function(e, template){
    Session.set('topic_search_query', e.currentTarget.value);
  },
  'keyup #tag-search':function(e, tempate){
    Session.set('tag_search_query', e.currentTarget.value);
  },
  'click .apply-filter': function(e, template){
    var keyword = $('#filter .sidebar-search input').val();
    var $general = $('.general-filter-container');
    // date range
    var fromDate = $('.input-daterange input.from').first().datepicker('getUTCDate');
    var toDate = $('.input-daterange input.to').first().datepicker('getUTCDate');
    // favorites
    var favorite = $('.filter-favorite i').hasClass('fa-check-square-o');
    // archived
    var archived = $('.filter-archived i').hasClass('fa-check-square-o');
    // get all topics selected
    var $topics = $('.topic-filter-container');
    var selectedTopics = [];
    $topics.find('i.fa-check-square-o').each(function ( index ) {
      $topicItem = $(this).parent('label');
      // var title = $topicItem.text();
      var id = $topicItem.attr('data-topic-id');
      // var topicObject = {
      //   'title' : title,
      //   '_id' : id
      // }
      selectedTopics.push(id);
    });
    // get all tags selected
    var $tags = $('.tag-filter-container');
    var selectedTags = [];
    $tags.find('i.fa-check-square-o').each(function ( index ) {
      $tagItem = $(this).parent('label');
      var title = $tagItem.text();
      selectedTags.push(title);
    });
    var searchQuery = {};
    if(keyword && keyword.length){
      searchQuery.title = keyword;
    }
    if(fromDate){
      searchQuery.fromDate = fromDate;
    }
    if(toDate){
      searchQuery.toDate = toDate;
    }
    if(favorite){
      searchQuery.favorite = true;
    }
    if(archived){
      searchQuery.archived = true;
    }
    if(selectedTopics && selectedTopics.length){
      searchQuery['topics._id'] = {  $in : selectedTopics }; 
    }
    if(selectedTags && selectedTags.length){
      searchQuery.tags = { $in : selectedTags }; 
    }
    Session.set('filter_search_query', JSON.stringify(searchQuery));
  },
  'click .clear-filter' : function(e){
    Session.set('filter_search_query', '');
  },
  'click .trigger': function (e, template) {
    // $(e.currentTarget).toggleClass('panel-active');
    // $('.panel-heading').removeClass('panel-active');
    var $icon = $(e.currentTarget).find('i');
    if($icon.hasClass('fa-chevron-right')){
      $('#accordion .panel-heading i.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      $icon.removeClass('fa-chevron-right');
      $icon.addClass('fa-chevron-down');
    }
    else{
      $('#accordion .panel-heading i.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    }
  },
  'click .general-option, click .sidebar-menu-items li label': function(e, template){
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
  }
});

Template.listArticleSidebar.created = function () {
    Session.set('topic_search_query', '');
    Session.set('tag_search_query', '');
    var self = this;
    self.my_tags = new ReactiveVar();
    Meteor.call('getTags', function (err, value) {
        if (err)
            console.log(err);
        else {
            self.my_tags.set(value);
        }     
    });
};

Template.listArticleSidebar.rendered = function (){
   $('.input-daterange input').each(function (){
      $(this).datepicker({
         'orientation': 'top',
         'autoclose': true
      });
   });


}


// Template.listArticleSidebar.events({
//   'click .sidebar-menu-items li': function (e) {
//     if($(e.currentTarget).find('i').hasClass('fa-square-o')){
//       $(e.currentTarget).find('i').removeClass('fa-square-o');
//       $(e.currentTarget).find('i').addClass('fa-check-square-o');
//     }
//     else{
//       $(e.currentTarget).find('i').removeClass('fa-check-square-o');
//       $(e.currentTarget).find('i').addClass('fa-square-o');
//     }
//   },
//   'click .btn-save-template-assignment': function (e){
//     var pre = [];
//     var post = [];
//     $('.post-template-options i.fa-check-square-o').each(function ( index ) {
//       $templateItem = $(this).parent('li');
//       var title = $templateItem.text();
//       var id = $templateItem.attr('data-template-id');
//       var templateObject = {
//         'title' : title,
//         '_id' : id
//       }
//       post.push(templateObject);
//     });
//     $('.pre-template-options i.fa-check-square-o').each(function( index ) {
//       $templateItem = $(this).parent('li');
//       var title = $templateItem.text();
//       var id = $templateItem.attr('data-template-id');
//       var templateObject = {
//         'title' : title,
//         '_id' : id
//       }
//       pre.push(templateObject);
//     });
//     var currentArticleId = Session.get('current_sidebar_article_id');
//     Articles.update({'_id': currentArticleId}, {
//       $set: {
//         preTemplates : pre,
//         postTemplates : post
//       }
//     });
//     toastr.success('Topics of the week have been added');
//   }
// });

// Template.listArticleSidebar.helpers({
//   myTemplates: function () {
//     return Templates.find();
//   }
// });