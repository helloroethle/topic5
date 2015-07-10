Meteor.publish('singleTemplate', function(templateId) {
  check(templateId, String);

  return Templates.findOne({_id: templateId});
});

Meteor.publish('templates', function() {
  return Templates.find({});
});