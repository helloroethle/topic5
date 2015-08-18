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


Template.quizDropdown.created = function(){
  this.current_selection = new ReactiveVar('Please Select');
  Session.set('current_user_answer', '');
};

Template.quizDropdown.events({
  'click .dropdown-menu li': function (e, template) {
    Session.set('current_user_answer', $(e.currentTarget).text());
    template.current_selection.set($(e.currentTarget).text());
  }
});
Template.quizDropdown.helpers({
  dropdown_current_selection: function (e, template) {
    return Template.instance().current_selection.get();
  }
});