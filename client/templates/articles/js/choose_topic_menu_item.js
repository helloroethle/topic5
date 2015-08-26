Template.chooseTopicMenuItem.helpers({
  isSelectedClass: function () {
    if(Template.instance().checked.get()){
      return 'fa-check-square-o';
    }
    return 'fa-square-o';
  }
});

Template.chooseTopicMenuItem.created = function () {
  // initialize
  var instance = this;
  instance.checked = new ReactiveVar(false);
  // autorun when article changes
  instance.autorun(function () {
    var article = Session.get('current_selected_article');
    instance.article = article;
    var topics = _.pluck(article.topics, '_id');
    if(_.indexOf(topics, instance.data._id) >= 0){
      instance.checked.set(true);
    }  
    else{
      instance.checked.set(false);
    }
  });
};

Template.chooseTopicMenuItem.events({
  'click li label': function (e, template) {
    e.preventDefault();
    var checked = template.checked.get();
    if(checked){
      // remove from article
      Articles.update({'_id': template.article._id}, 
      { $pull: { topics: {'_id':template.data._id} } });

      Topics.update({'_id': template.data._id}, 
        { $inc: {  "count": -1 } });
    }
    else{
      // add to article
      Articles.update({'_id': template.article._id}, 
      { $addToSet: { topics: {'title': template.data.title, '_id':template.data._id} } });

      Topics.update({'_id': template.data._id}, 
        { $inc: {"count": 1 } });
      // should update this week item too if exists
    }
    template.checked.set(!checked);
    toastr.success('Article has been updated');
  },
});