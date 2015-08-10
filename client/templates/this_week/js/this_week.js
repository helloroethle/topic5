Template.thisWeekTopic.helpers({
  // topics: function() {
  //   var queryOptions = {
  //     sort: {title: 1}
  //   };
  //   var keyword = Session.get('topic_search_query');
  //   var query = new RegExp( keyword, 'i') ;
  //   return Topics.find({'title': query}, queryOptions);
  // },
  allThisWeeks: function(){
    return ThisWeeks.find();
  }
});


Template.thisWeekTopic.created = function () {
  // Session.set('topic_search_query', '');
  var user = Meteor.user();
  var currentDate = new Date();
  if(!user.profile.thisWeek || new Date(user.profile.thisWeek.endDate) < currentDate){
    // var startDate = moment().day(1).toDate(), endDate = moment().day(7).toDate();
    var startDate = moment().startOf('isoWeek').toDate();
    var endDate = moment().endOf('isoWeek').toDate();
    var thisWeekObject = {
      'startDate' : startDate,
      'endDate' : endDate,
      'userId' : Meteor.userId(),
      'prev' : user.profile.thisWeek.id
    }
    var newId = ThisWeeks.insert( thisWeekObject );
    var profileThisWeek  = {
      'endDate' : endDate,
      'id' : newId
    }
    ThisWeeks.update({_id: user.profile.thisWeek._id}, {$set:{"next":newId}});
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.thisWeek":profileThisWeek}});
  }
  Session.set("show_right_sidebar", false);
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-left',
  };
};

Template.thisWeekTopic.events({
  // 'keyup .search-container input': function(e){
  //   Session.set('topic_search_query', e.currentTarget.value);
  // },
  // 'click h2.pick-week' : function(e){
  //   $('#thisWeekDateModal').modal();
  // },
  'click .add-topics' : function(e){
    $('#wrapper').toggleClass('toggled-right-sidebar');
  },
  'keypress .add-topic': function(e) {
    if(e.which === 13){
      var topic = {
        title: $('.add-topic').val()
      };
    var errors = validateTopic(topic);
    if (errors.title){
      console.log(errors);
      return false;
    }

    // it's better to keep our event handlers simple and, if we are doing more than the most basic inserts or updates to collections, use a Method.
    Meteor.call('createTopic', topic, function(error, result) {
      // display the error to the user and abort
      if (error){
        toastr.error(error, 'oops... something isn\'t right');
      }
      else{
        toastr.success('New topic has been created', 'Success!');
        $('.add-topic').val('').focus();
      }
    });
    }
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
    $('.select-outer-container').toggle();
    $('.add-topic').val('');
  },
  'click .select-menu-list-selected-title' : function(e){
    $(e.currentTarget).parent().find('.select-outer-container').toggle();
  }
});
