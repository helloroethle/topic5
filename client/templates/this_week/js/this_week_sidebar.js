Template.thisWeekSidebar.events({
  'keyup .search-container input': function(e){
    Session.set('topic_search_query', e.currentTarget.value);
  },
  'click .btn-save-topics': function(e){
    $('i.fa-check-square-o').each(function( index ) {
      $topicItem = $(this).parent('label');
      var title = $topicItem.text();
      var id = $topicItem.attr('data-topic-id');
      var thisWeekObject = {
        'title' : title,
        'topicId' : id
      }
      ThisWeeks.insert( thisWeekObject );
    });
    toastr.success('Topics of the week have been added');
  },
  'click .sidebar-menu-items li label': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
  },
  'click .save-week-topics':function(e){
    console.log('hello save week topics');
  },
  'keypress #add-this-week-topics': function(e) {
      if(e.which === 13){
        console.log('enter has been pressed');
      }
    }
});

Template.thisWeekSidebar.created = function () {
  Session.set('topic_search_query', '');
};

Template.thisWeekSidebar.helpers({
  topics: function() {
    var queryOptions = {
      sort: {title: 1}
    };
    var keyword = Session.get('topic_search_query');
    var query = new RegExp( keyword, 'i') ;
    return Topics.find({'title': query}, queryOptions);
  },
});


