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

Template.createQuizSidebar.created = function () {
  Session.set('preview_mode', false);
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
        Session.set('preview_mode', true);
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
          // var required = $(this).find('.item-required').is(':checked');
          // if(required){
          //   $(this).find('.item-question').addClass('item-question-required');  
          // }
        })
      }
      else{
        Session.set('preview_mode', false);
        $('.builder-question-content [readonly=readonly]').removeAttr('readonly');
        $('.hide').removeClass('hide');
        // $('.item-question-required').removeClass('item-question-required');
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
      // find answers
      if(optionItems.length > 0){
        // one of the option based fields - must find marked answer(s)
        // if checkbox
        if(optionKey == 'checkbox'){
          var $markedAnswers = $content.find('.option-list .option-item span.fa-check-square-o');
          var answers = [];
          $markedAnswers.each(function(index, item){
            answers.push($(item).parent('div.option-item').find('.item-option-text').val());
          });
          answer = answers.join();
        }
        else{
          // means will be either multiple choice or dropdown which have same html
          var $markedAnswer = $content.find('.option-list .option-item span.fa-check-circle-o').first();
          answer = $markedAnswer.parent('.option-item').find('.item-option-text').val();
        }
      }
      if(optionKey == 'true_false'){
        answer = $content.find("input[type='radio']:checked").val() ? true : false;
      }
      else if(optionKey == 'rating'){
        answer = $content.find('.selected').text();
      }
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