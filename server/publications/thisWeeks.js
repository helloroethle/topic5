Meteor.publish('thisWeeks', function(){
  return ThisWeeks.find({});
})