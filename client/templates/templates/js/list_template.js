Template.listTemplate.helpers({
  myTemplates: function() {
    // sort in submitted decending order
    return Templates.find({});
  }
});