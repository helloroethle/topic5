Template.detailQuiz.rendered = function () {
  Sortable.create( $('.builder-option-list').get(0), 
    {
      group: {
        name : 'builder',
        pull: 'clone',
        put: false
      },
      ghostClass: "sortable-ghost",
      sort : false
    }
  );
  Sortable.create($('.builder-question-list').get(0), 
    {
      group: {
        name : 'builder',
        put : true
      },
      ghostClass: "sortable-ghost-question",
    }
  );
};  

Template.detailQuiz.created = function () {
  Session.set('show_right_sidebar', false);
  Session.set('current_quiz_id', this.data._id);
};


// Template.createTemplate.helpers({

// });

Template.detailQuiz.events({
  'click .builder-option-list li': function (e) {
    $(e.currentTarget).clone().appendTo('.builder-question-list');
  },
  'click .btn-clear-template':function(e){
    $('.builder-question-list').empty();
  },
  'click .btn-save-template':function(e){

  },
  'click .builder-item-remove':function(e){
    $(e.currentTarget).parents('li').remove();
  },
  'click .builder-item-expand':function(e){
    $(e.currentTarget).parents('li').find('.option-full').toggle();
  },
  // should move to the template
  'click .item-add':function(e){
    $appendToItem = $(e.currentTarget).parents('div.builder-item').find('div.option-list');
    $itemToAppend = $(e.currentTarget).parents('div.builder-item').find('div.option-list div.option-item').first();
    $itemToAppend.clone().appendTo($appendToItem).find('.item-option-text').val('');
  },
  'click .builder-checkbox .item-remove':function(e){
    var checkboxCount = $(e.currentTarget).parents('div.option-list').find('div.option-item').length;
    if(checkboxCount == 1){
      $(e.currentTarget).parents('div.option-item').find('.item-option-text').val('');
    }
    else{
      $(e.currentTarget).parents('div.option-item').remove();  
    }
  }
});