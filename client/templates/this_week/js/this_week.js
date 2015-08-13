Template.thisWeekTopic.helpers({
  topics: function() {
    var queryOptions = {
      sort: {title: 1}
    };
    var keyword = Session.get('topic_search_query');
    var query = new RegExp( keyword, 'i') ;
    return Topics.find({'title': query}, queryOptions);
  },
  // allThisWeeks: function(){
  //   return ThisWeeks.find();
  // },
  currentWeek: function(){
    var thisWeekId = Session.get('current_week_id');
    console.log(thisWeekId);
    var thisWeek = ThisWeeks.findOne({_id: thisWeekId});
    console.log(thisWeek);
    return thisWeek;
  },
  showMenuSelect: function(){
    return Session.equals("show_menu_select", true) ? "visibile" : "visibile-hidden";
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
      '_id' : newId
    }
    ThisWeeks.update({_id: user.profile.thisWeek._id}, {$set:{"next":newId}});
    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.thisWeek":profileThisWeek}});
  }
  console.log(user);
  Session.set('current_week_id', user.profile.thisWeek._id);
  // var instance = this;
  // instance.currentWeek = 
  Session.set('show_menu_select', false);
  Session.set("show_right_sidebar", false);
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-bottom-left',
  };
};

Template.thisWeekTopic.events({
  'click .menu-item': function(e) {
    console.log('hello inner container selection');
    var thisWeekId = Session.get('current_week_id');
    $topicItem = $(e.currentTarget).find('.select-title');
    var title = $topicItem.text();
    var id = $topicItem.attr('data-topic-id');
    var thisWeekTopicObject = {
      '_id' : id,
      'title' : title,
      'count' : 0
    };
    console.log(thisWeekTopicObject);
    ThisWeeks.update(
       { _id: thisWeekId },
       { $addToSet: { topics: thisWeekTopicObject } }
    );
    // ThisWeeks.insert( thisWeekObject );
    toastr.success('Topic of the week has been added');
    Session.set('show_menu_select', false);
    $('.add-topic').val('');
  },
  // 'focus input.add-topic':function(e){
  //   Session.set('show_menu_select', true);
  // },
  // 'blur input.add-topic':function(e){
  //   $('input.add-topic').val('');
  //   // console.log('hello blur');
  //   // Session.set('show_menu_select', false);
  //   // return true;
  // },
  'keyup input.add-topic': function(e){
    if(e.currentTarget.value.length > 0){
      Session.set('show_menu_select', true);
    }
    else{
      Session.set('show_menu_select', false);
    }
    Session.set('topic_search_query', e.currentTarget.value);
  },
  // 'click h2.pick-week' : function(e){
  //   $('#thisWeekDateModal').modal();
  // },
  'click .add-topics' : function(e){
    Session.set('show_right_sidebar', true);
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
    // Meteor.call('createTopic', topic, function(error, result) {
    //   // display the error to the user and abort
    //   if (error){
    //     toastr.error(error, 'oops... something isn\'t right');
    //   }
    //   else{
    //     toastr.success('Topic has been added', 'Success!');
    //     $('.add-topic').val('').focus();
    //   }
    // });
    }
  }
  // 'click .select-menu-list-selected-title' : function(e){
  //   $(e.currentTarget).parent().find('.select-outer-container').toggle();
  // }
});
