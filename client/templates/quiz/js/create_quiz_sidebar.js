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
  console.log(this);
  console.log(this.data);
  console.log(this._id);
};

Template.createQuizSidebar.helpers({
  detailMode: function () {
    return Session.get('current_quiz_id') ? true : false;
  }
});

Template.createQuizSidebar.events({
  'click .builder-option-list li': function (e) {
    $(e.currentTarget).clone().appendTo('.builder-question-list');
  },
  'click .btn-clear':function(e){
    if(Session.get('current_quiz_id')){
      Quizes.remove(Session.get('current_quiz_id'));
      Router.go('listQuizes');
    }
    else{
      $('.builder-question-list').empty();
    }
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
    var $questionList = $('.builder-question-list li');
    var title = $('.template-title').val();
    if(!title || title == ''){
      toastr.error('Please enter quiz title');
      return;
    }
    if($questionList.length == 0){
      toastr.error('Please add at least one question');
      return;
    }
    var tplDescription = $('.template-description').val();
    var questions = [];
    var errors = [];
    $questionList.each(function(index, item){
      var optionKey = $(item).find('.option-content').data('key');
      var $content = $(item).find('.question-content div.builder-item');
      // var required = $content.find('.item-required').is(":checked");
      var question = $content.find('.item-question').val();
      if(question == ''){
        errors.push($content);
        return;
      }
      var answer = '';
      // find answers
      if(optionKey == 'text' || optionKey == 'paragraph'){
        answer = $content.find('.item-placeholder').val();
      }
      else{
        if(optionKey == 'true_false'){
          answer = $content.find("input[type='radio']:checked").val() ? true : false;
        }
        else if(optionKey == 'rating'){
          answer = $content.find('.selected').text();
        }
        else if(optionKey == 'checkbox'){
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
      if(!answer || answer == ''){
        errors.push($content);
        return;
      }

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

    if(errors.length > 0){
      $('.error').removeClass('error');
      _.each(errors, function(item){
        item.addClass('error');
      });
      toastr.error('Please fill out all questions and answers');
      return;
    }

    // get topics if any were selected - { 'title' : title, '_id' : id }
    var quizTopics = JSON.parse(Session.get('quiz_topics'));

    if(Session.get('current_quiz_id')){
      var quiz = {
        'title': title,
        'questions':questions,
        'description':tplDescription,
        'updated': moment().toDate(),
        // 'topics': quizTopics
      }
      Quizes.update({'_id': Session.get('current_quiz_id')}, {
        $set: quiz
      });
      Router.go('listQuizes');
      toastr.success('Quiz has been updated', 'Success!');
    }
    else{
      var quiz = {
        'title': title,
        'questions':questions,
        'description':tplDescription,
        'created': moment().toDate(),
        'userId': Meteor.userId(),
        'topics': quizTopics
      }
      Quizes.insert( quiz );
      Router.go('listQuizes');
    }
  },
});