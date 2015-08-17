Template.templateDropdown.events({
  'click .dropdown-menu li': function (e, template) {
    template.current_selection.set($(e.currentTarget).text());
  }
});

Template.templateDropdown.helpers({
  dropdown_current_selection: function (e, template) {
    return Template.instance().current_selection.get();
  }
});

Template.templateDropdown.created = function () {
  this.current_selection = new ReactiveVar("Please Select");
};
