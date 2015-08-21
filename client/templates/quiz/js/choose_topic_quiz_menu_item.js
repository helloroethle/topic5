Template.chooseTopicQuizMenuItem.helpers({
  isSelectedClass: function () {
    if(Template.instance().checked.get()){
      return 'fa-check-square-o';
    }
    return 'fa-square-o';
  }
});

Template.chooseTopicQuizMenuItem.created = function () {
  // initialize
  var instance = this;
  instance.checked = new ReactiveVar(false);
  // autorun when quiz selection changes
  instance.autorun(function () {
    var quiz = Session.get('current_selected_item');
    instance.quiz = quiz;
    var topics = _.pluck(quiz.topics, '_id');
    if(_.indexOf(topics, instance.data._id) >= 0){
      instance.checked.set(true);
    }  
    else{
      instance.checked.set(false);
    }
  });
};

Template.chooseTopicQuizMenuItem.events({
  'click li label': function (e, template) {
    e.preventDefault();
    var checked = template.checked.get();
    if(checked){
      // remove from article
      Quizes.update({'_id': template.quiz._id}, 
      { $pull: { topics: {'_id':template.data._id} } });
    }
    else{
      Quizes.update({'_id': template.quiz._id}, 
      { $addToSet: { topics: {'title': template.data.title, '_id':template.data._id} } });
      // should update this week item too if exists
    }
    template.checked.set(!checked);
    toastr.success('Quiz has been updated');
  },
});