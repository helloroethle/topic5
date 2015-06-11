Template.detailTimeline.events({
  'click .btn-template-delete': function(e) {
      Timelines.remove(this._id);
  }
})