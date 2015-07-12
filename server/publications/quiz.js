Meteor.publish('quizes', function() {
  return Quizes.find({});
});