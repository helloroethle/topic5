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
  Session.set('progress', 0);
};



Template.detailQuiz.events({
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
    // only one check can be present
    $(e.currentTarget).parents('.option-list').find('.fa-check-circle-o').removeClass('fa-check-circle-o').addClass('fa-circle-thin');
    $(e.currentTarget).removeClass('fa-circle-thin').addClass('fa-check-circle-o');
  },
  'keypress .builder-checkbox input, keypress .builder-dropdown input, keypress .builder-multiple-choice input':function(e, template){
    if(e.which === 13){
      $appendToItem = $(e.currentTarget).parents('div.builder-item').find('div.option-list');
      $itemToAppend = $(e.currentTarget).parents('div.builder-item').find('div.option-list div.option-item').first();
      var $itemAppended = $itemToAppend.clone().appendTo($appendToItem);
      $itemAppended.find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-square-o');
      $itemAppended.find('.fa-check-circle-o').removeClass('fa-check-circle-o').addClass('fa-circle-thin');
      $itemAppended.find('.item-option-text').val('').focus();
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
    var $itemAppended = $itemToAppend.clone().appendTo($appendToItem);
    $itemAppended.find('.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-square-o');
    $itemAppended.find('.fa-check-circle-o').removeClass('fa-check-circle-o').addClass('fa-circle-thin');
    $itemAppended.find('.item-option-text').val('').focus();
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
  },



  'click .builder-option-list li': function (e) {
    $(e.currentTarget).clone().appendTo('.builder-question-list');
  },

});