Interactions = new Meteor.Collection('interactions');
Interactions.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function (){
    return true;
  },
});
