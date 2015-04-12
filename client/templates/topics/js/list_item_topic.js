Template.listItemTopic.helpers({
  ownTopic: function() {
    return this.userId == Meteor.userId();
  },
});