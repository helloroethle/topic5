Template.listFilterTemplateSidebar.helpers({
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


Template.listFilterTemplateSidebar.events({
  'keyup #topic-search':function(e, template){
    Session.set('topic_search_query', e.currentTarget.value);
  },
  'click .apply-filter': function(e, template){
    var keyword = $('.sidebar-search input').val();

    var $topics = $('.topic-filter-container');
    var selectedTopics = [];
    $topics.find('i.fa-check-square-o').each(function ( index ) {
      $topicItem = $(this).parent('label');
      var id = $topicItem.attr('data-topic-id');
      selectedTopics.push(id);
    });

    var searchQuery = {};
    if(keyword && keyword.length){
      searchQuery.title = keyword;
    }

    if(selectedTopics && selectedTopics.length){
      searchQuery['topics._id'] = {  $in : selectedTopics }; 
    }
    console.log(searchQuery);

    Session.set('filter_search_query', JSON.stringify(searchQuery));
  },
  'click .clear-filter' : function(e){
    $('i.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-square-o');
    Session.set('filter_search_query', '');
  },

  'click .sidebar-menu-items li label': function(e, template){
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

Template.listFilterTemplateSidebar.created = function () {
    Session.set('topic_search_query', '');
};