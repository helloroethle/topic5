Template.createTemplate2.rendered = function () {
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


// Template.createTemplate.helpers({

// });

Template.createTemplate2.events({
  'click .builder-option-list li': function (e) {
    $(e.currentTarget).clone().appendTo('.builder-question-list');
  },
  'click .btn-clear-template':function(e){
    $('.builder-question-list').empty();
  },
  'keypress .builder-checkbox input, keypress .builder-dropdown input, keypress .builder-multiple-choice input':function(e, template){
    if(e.which === 13){
      console.log('enter has been pressed');
      $appendToItem = $(e.currentTarget).parents('div.builder-item').find('div.option-list');
      $itemToAppend = $(e.currentTarget).parents('div.builder-item').find('div.option-list div.option-item').first();
      $itemToAppend.clone().appendTo($appendToItem).find('.item-option-text').val('').focus();
    }
  },
  'click .btn-save-template':function(e){
    console.log('btn save template called');
    var $templateList = $('.builder-question-list li');
    var title = $('.template-title').val();
    var tplDescription = $('.template-description').val();
    var questions = [];
    $templateList.each(function(index, item){
      var optionKey = $(item).find('.option-content').data('key');
      var $content = $(item).find('.question-content div.builder-item');
      var required = $content.find('.item-required').is(":checked");
      var question = $content.find('.item-question').val();
      var placeholder = $content.find('.item-placeholder').val();
      var description = $content.find('.item-description').val();
      var $optionList = $content.find('.option-list .option-item .item-option-text');
      var optionItems = [];
      var meta = getTemplateOption(optionKey);
      meta.name = optionKey;
      $optionList.each(function(index, item){
        optionItems.push($(item).val());
      });
      questions.push({
        'meta':meta,
        'order': index,
        'title': question,
        'options':optionItems,
        'required':required,
        'placeholder': placeholder,
        'description': description
      });
    });
    var template = {
      'title': title,
      'questions':questions,
      'description':tplDescription,
      'created': moment().toDate()
    }
    Templates.insert( template );
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