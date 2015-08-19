Template.createQuiz.rendered = function () {
  this.sort = Sortable.create($('.builder-question-list').get(0), 
    {
      group: {
        name : 'builder',
        put : true
      },
      ghostClass: "sortable-ghost-question",
    }
  );
};

Template.createQuiz.destroyed = function () {
  this.sort.destroy();
};

Template.createQuiz.created = function () {
  Session.set('is_detail_quiz', true);
  Session.set('show_right_sidebar', false);
  Session.set('progress', 0);
  if(this.data && this.data._id){
    Session.set('current_quiz_id', this.data._id);
  }
  else{
    Session.set('current_quiz_id', '');
  }
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
    // only one check can be present
    console.log($(e.currentTarget).parents('.option-list').find('.fa-check-circle-o'));
    $(e.currentTarget).parents('.option-list').find('.fa-check-circle-o').removeClass('fa-check-circle-o').addClass('fa-circle-thin');
    // if($(e.currentTarget).hasClass('fa-circle-thin')){
    $(e.currentTarget).removeClass('fa-circle-thin').addClass('fa-check-circle-o');
    // }
    // else{
    //   $(e.currentTarget).removeClass('fa-check-circle-o');
    //   $(e.currentTarget).addClass('fa-circle-thin');
    // }
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
  }

});