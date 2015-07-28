Template.thisWeekTopic.helpers({
  topics: function() {
    var queryOptions = {
      sort: {title: 1}
    };
    var keyword = Session.get('topic_search_query');
    var query = new RegExp( keyword, 'i') ;
    return Topics.find({'title': query}, queryOptions);
  },
  chosen_title: function(){
    return Session.get('chosen_title');
  },
  allThisWeeks: function(){
    return ThisWeeks.find();
  }
});


Template.thisWeekTopic.created = function () {
  Session.set('topic_search_query', '');
  Session.set('chosen_title', 'hello');
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-left',
  };
};

Template.thisWeekTopic.events({
  'keyup .search-container input': function(e){
    Session.set('topic_search_query', e.currentTarget.value);
  },
  'click .menu-item': function(e) {
    $topicItem = $(e.currentTarget).find('.select-title');
    var title = $topicItem.text();
    var id = $topicItem.attr('data-topic-id');
    var thisWeekObject = {
      'title' : title,
      'topicId' : id
    }
    ThisWeeks.insert( thisWeekObject );
    toastr.success('Topic of the week has been added');
  },
  'click .select-menu-list-selected-title' : function(e){
    $(e.currentTarget).parent().find('.select-outer-container').toggle();
  }
});
