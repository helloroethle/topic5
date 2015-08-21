Template.chooseTopicTemplateMenuItem.helpers({
  isSelectedClass: function () {
    if(Template.instance().checked.get()){
      return 'fa-check-square-o';
    }
    return 'fa-square-o';
  }
});

Template.chooseTopicTemplateMenuItem.created = function () {
  // initialize
  var instance = this;
  instance.checked = new ReactiveVar(false);
  // autorun when template selection changes
  instance.autorun(function () {
    var template = Session.get('current_selected_item');
    instance.template = template;
    var topics = _.pluck(template.topics, '_id');
    if(_.indexOf(topics, instance.data._id) >= 0){
      instance.checked.set(true);
    }  
    else{
      instance.checked.set(false);
    }
  });
};

Template.chooseTopicTemplateMenuItem.events({
  'click li label': function (e, template) {
    e.preventDefault();
    var checked = template.checked.get();
    if(checked){
      // remove from article
      Templates.update({'_id': template.template._id}, 
      { $pull: { topics: {'_id':template.data._id} } });
    }
    else{
      Templates.update({'_id': template.template._id}, 
      { $addToSet: { topics: {'title': template.data.title, '_id':template.data._id} } });
      // should update this week item too if exists
    }
    template.checked.set(!checked);
    toastr.success('Template has been updated');
  },
});