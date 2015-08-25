// Template.listItemTopic.helpers({
//   ownTopic: function() {
//     return this.userId == Meteor.userId();
//   },
// });


Template.listItemTopic.events({
  'click .delete': function(e){
    // show modal for confirmation
      Meteor.call('deleteTopic', this._id, function(error, result) {
        // display the error to the user and abort
        if (error){
          toastr.error(error, 'oops... something isn\'t right');
        }
        else{
          toastr.success('Topic Successfully Deleted');
        }
      });
    }
});


Template.listItemTopic.rendered = function () {
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.listItemTopic.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};
