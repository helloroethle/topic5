Template.createQuizSidebar.rendered = function () {
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
};

Template.createQuizSidebar.events({
  'click .builder-option-list li': function (e) {
    $(e.currentTarget).clone().appendTo('.builder-question-list');
  },
  'click .btn-clear':function(e){
    $('.builder-question-list').empty();
  },
  'click .btn-preview':function(e){
      $('.builder-question-content').toggleClass('preview-template');
      $('.template-title, .template-description').attr('readonly', 'readonly');
      var buildPreview = $('.builder-question-content').hasClass('preview-template');
      if(buildPreview){
        var $questionContainers = $('.builder-question-content .question-content');
        $questionContainers.each(function(index){
          $(this).find('input, textarea').attr('readonly', 'readonly');
          var question = $(this).find('.item-question').val();
          if(question == ''){
            $(this).addClass('hide');
          }
          var description = $(this).find('.item-description').val();
          if(description == ''){
            $(this).find('.item-description').addClass('hide');
          }
          var required = $(this).find('.item-required').is(':checked');
          if(required){
            $(this).find('.item-question').addClass('item-question-required');  
          }
        })
      }
      else{
        $('.builder-question-content [readonly=readonly]').removeAttr('readonly');
        $('.hide').removeClass('hide');
        $('.item-question-required').removeClass('item-question-required');
      }
  },
  'click .btn-save':function(e){
    console.log('clicked');
    var $questionList = $('.builder-question-list li');
    var title = $('.template-title').val();
    var tplDescription = $('.template-description').val();
    var questions = [];
    $questionList.each(function(index, item){
      var optionKey = $(item).find('.option-content').data('key');
      var $content = $(item).find('.question-content div.builder-item');
      // var required = $content.find('.item-required').is(":checked");
      var question = $content.find('.item-question').val();
      var answer = $content.find('.item-placeholder').val();
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
        'question': question,
        'options':optionItems,
        // 'required':required,
        'answer': answer,
        'description': description
      });
    });
    var quiz = {
      'title': title,
      'questions':questions,
      'description':tplDescription,
      'created': moment().toDate(),
      'userId': Meteor.userId()
    }
    Quizes.insert( quiz );
    // redirect and call the toastr.success on the edit page
    toastr.success('New Quiz has been created', 'Success!');
  },
});