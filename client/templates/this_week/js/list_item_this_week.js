Template.listItemThisWeek.rendered = function () {
  this.$('[data-toggle="tooltip"]').tooltip();
};

Template.listItemThisWeek.destroyed = function () {
  this.$('[data-toggle="tooltip"]').tooltip('destroy');
};
