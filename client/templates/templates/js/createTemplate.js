Template.createTemplate.rendered = function () {
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
      onAdd: function(e){
        var itemEl = e.item;
        $(itemEl).find('i').remove();
      }
    }
  );
};  


// Template.createTemplate.helpers({

// });

Template.createTemplate.events({
  'click .builder-option-list li': function (e) {
    $(e.currentTarget).clone().appendTo('.builder-question-list');
  },
  'click .btn-clear-template':function(e){
    $('.builder-question-list').empty();
  },
  'click .builder-item-remove':function(e){
    $(e.currentTarget).parents('li').remove();
  },
  // should move to the template
  'click .item-add':function(e){
    $appendToItem = $(e.currentTarget).parents('div.builder-checkbox').find('div.checkbox-list');
    $itemToAppend = $(e.currentTarget).parents('div.builder-checkbox').find('div.checkbox-list div.checkbox-item').first();
    $itemToAppend.clone().appendTo($appendToItem).find('.item-checkbox-text').val('');
  },
  'click .item-remove':function(e){
    var checkboxCount = $(e.currentTarget).parents('div.checkbox-list').find('div.checkbox-item').length;
    console.log(checkboxCount);
    if(checkboxCount == 1){
      $(e.currentTarget).parents('div.checkbox-item').find('.item-checkbox-text').val('');
    }
    else{
      $(e.currentTarget).parents('div.checkbox-item').remove();  
    }
  }
});