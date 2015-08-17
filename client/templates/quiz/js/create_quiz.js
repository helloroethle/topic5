Template.createQuiz.rendered = function () {
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

Template.createQuiz.created = function () {
  Session.set('is_detail_quiz', true);
};

Template.createQuiz.events({
  'click .checkbox-item .chbx':function(e){
    if($(e.currentTarget).hasClass('fa-square-o')){
      $(e.currentTarget).removeClass('fa-square-o');
      $(e.currentTarget).addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).removeClass('fa-check-square-o');
      $(e.currentTarget).addClass('fa-square-o');
    }
  },
  'click .radio':function(e){
    if($(e.currentTarget).hasClass('fa-circle-thin')){
      $(e.currentTarget).removeClass('fa-circle-thin');
      $(e.currentTarget).addClass('fa-check-circle-o');
    }
    else{
      $(e.currentTarget).removeClass('fa-check-circle-o');
      $(e.currentTarget).addClass('fa-circle-thin');
    }
  },
  'keypress .builder-checkbox input, keypress .builder-dropdown input, keypress .builder-multiple-choice input':function(e, template){
    if(e.which === 13){
      $appendToItem = $(e.currentTarget).parents('div.builder-item').find('div.option-list');
      $itemToAppend = $(e.currentTarget).parents('div.builder-item').find('div.option-list div.option-item').first();
      $itemToAppend.clone().appendTo($appendToItem).find('.item-option-text').val('').focus();
    }
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
  'click .item-remove':function(e){
    var itemCount = $(e.currentTarget).parents('div.option-list').find('div.option-item').length;
    if(itemCount == 1){
      $(e.currentTarget).parents('div.option-item').find('.item-option-text').val('');
    }
    else{
      $(e.currentTarget).parents('div.option-item').remove();  
    }
  },
  'click .rating .rating-bubble': function (e, template) {
    $('.rating-bubble.selected').removeClass('selected');
    $(e.currentTarget).addClass('selected');
  }

});