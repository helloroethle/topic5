Meteor.publish('interactions', function() {
  return Interactions.find();
});

Sortable.collections = ['interactions'];