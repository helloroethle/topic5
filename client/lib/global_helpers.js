// Example of registering a global template helper
// UI.registerHelper('color', function (parameter) {
//     return Session.equals('color', parameter) ? 'blue' : 'red';
// });

templateOptionHelpers = {
  'text' : {
    'label' : 'Text',
    'icon' : 'fa-font',
    'display' : 'displayText',
    'edit' : 'editText',
    'template' : 'templateText',
    'quiz_template' : 'quizText',
    'quiz_create_template' : 'quizCreateText',
    'quiz_auto_grade' : true
  },
  'paragraph' : {
    'label' : 'Paragraph',
    'icon' : 'fa-paragraph',
    'display' : 'displayParagraph',
    'edit' : 'editParagraph',
    'template' : 'templateParagraph',
    'quiz_template' : 'quizParagraph',
    'quiz_create_template' : 'quizCreateParagraph',
    'quiz_auto_grade' : false
  },
  'checkbox' : {
    'label' : 'Check Box',
    'icon' : 'fa-square-o',
    'display' : 'displayCheckbox',
    'edit' : 'editCheckbox',
    'template' : 'templateCheckbox',
    'quiz_template' : 'quizCheckbox',
    'quiz_create_template' : 'quizCreateCheckbox',
    'quiz_auto_grade' : true
  },
  'multiple_choice' : {
    'label' : 'Multiple Choice',
    'icon' : 'fa-circle-o',
    'display' : 'displayMultipleChoice',
    'edit' : 'editMultipleChoice',
    'template' : 'templateMultipleChoice',
    'quiz_template' : 'quizMultipleChoice',
    'quiz_create_template' : 'quizCreateMultipleChoice',
    'quiz_auto_grade' : true
  },
  'select' : {
    'label' : 'Dropdown',
    'icon' : 'fa-caret-down',
    'display' : 'displayDropdown',
    'edit' : 'editDropdown',
    'template' : 'templateDropdown',
    'quiz_template' : 'quizDropdown',
    'quiz_create_template' : 'quizCreateDropdown',
    'quiz_auto_grade' : true
  },
  'true_false' : {
    'label' : 'True/False',
    'icon' : 'fa-toggle-on',
    'display' : 'displayTrueFalse',
    'edit' : 'editTrueFalse',
    'template' : 'templateTrueFalse',
    'quiz_template' : 'quizTrueFalse',
    'quiz_create_template' : 'quizCreateTrueFalse',
    'quiz_auto_grade' : true
  },
  'rating' : {
    'label' : 'Rating',
    'icon' : 'fa-star',
    'display': 'displayRating',
    'edit': 'editRating',
    'template' : 'templateRating',
    'quiz_template' : 'quizRating',
    'quiz_create_template' : 'quizCreateRating',
    'quiz_auto_grade' : true
  },
  // 'header' : {
  //   'label' : 'Header',
  //   'icon' : 'fa-header',
  //   'display' : 'displayHeader',
  //   'edit' : 'editHeader',
  //   'template' : 'templateHeader'
  // },
  // 'section' : {
  //   'label' : 'Section Break',
  //   'icon' : 'fa-minus',
  //   'display' : 'displaySection',
  //   'edit' : 'editSection',
  //   'template' : 'templateSection'
  // },
  // 'info' : {
  //   'label' : 'Info Section',
  //   'icon' : 'fa-info',
  //   'display' : 'displayInfo',
  //   'edit' : 'editInfo',
  //   'template' : 'templateInfo'
  // }
}

interactionMeta = {
  'note' : {
    'label' : 'Note',
    'icon' : 'fa-pencil-square-o',
    'template' : 'Note',
    'create_template' : 'createNote',
    'quiz_template' : 'quizNote',
    'display_fields' : [],
    'summary_field' : 'note',
    'secondary_field' : '',
    'question_field' : '',
    'question_label' : '',
    'answer_field' : 'note',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'quote' : {
    'label' : 'Quote',
    'icon' : 'fa-quote-left',
    'template' : 'Quote',
    'create_template' : 'createQuote',
    'quiz_template' : 'quizQuote',
    'display_fields' : [],
    'summary_field' : 'quote',
    'secondary_field' : 'source',
    'question_field' : '',
    'question_label' : '',
    'answer_field' : 'quote',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : true
  },
  'fact' : {
    'label' : 'Fact',
    'icon' : 'fa-exclamation',
    'template' : 'Fact',
    'create_template' : 'createFact',
    'quiz_template' : 'quizFact',
    'display_fields' : [],
    'summary_field' : 'fact',
    'secondary_field' : 'source',
    'question_field' : '',
    'question_label' : '',
    'answer_field' : 'fact',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'responsequiz' : {
    'label' : 'General Question',
    'icon' : 'fa-bullhorn',
    'template' : 'ResponseQuiz',
    'create_template' : 'createResponseQuiz',
    'quiz_template' : 'quizResponseQuiz',
    'display_fields' : [],
    'summary_field' : 'question',
    'secondary_field' : 'answer',
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':false,
    'quiz_auto_grade' : false
  },
  'mcquiz' : {
    'label' : 'Multiple Choice Quiz',
    'icon' : 'fa-list-ol',
    'template' : 'MCQuiz',
    'create_template' : 'createMCQuiz',
    'quiz_template' : 'quizMCQuiz',
    'display_fields' : [],
    'summary_field' : 'question',
    'secondary_field' : 'choices',
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':false,
    'quiz_auto_grade' : true
  },
  'tfquiz' : {
    'label' : 'True False Quiz',
    'icon' : 'fa-toggle-on',
    'template' : 'TFQuiz',
    'create_template' : 'createTFQuiz',
    'quiz_template' : 'quizTFQuiz',
    'display_fields' : [],
    'summary_field' : 'question',
    'secondary_field' : '',
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':false,
    'quiz_auto_grade' : true
  },
  // 'flashcard' : {
  //   'label' : 'Flashcard',
  //   'icon' : 'fa-list-alt',
  //   'template' : 'FlashCard',
  //   'create_template' : 'createFlashCard',
  //   'quiz_template' : 'quizFlashCard',
  //   'display_fields' : [],
  //   'summary_field' : 'front_text',
  //   'secondary_field' : 'back_text',
  //   'outline' : true,
  //   'collection' : '',
  //   'quiz':true,
  //   'allow_question':false,
  //   'quiz_auto_grade' : false
  // },
  'idea' : {
    'label' : 'New Idea',
    'icon' : 'fa-info-circle',
    'template' : 'Idea',
    'create_template' : 'createIdea',
    'quiz_template' : 'quizIdea',
    'display_fields' : [],
    'summary_field' : 'idea',
    'secondary_field' : '',
    'question_field' : '',
    'question_label' : '',
    'answer_field' : 'idea',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'futuretopic' : {
    'label' : 'Future Topic',
    'icon' : 'fa-share',
    'template' : 'FutureTopic',
    'create_template' : 'createFutureTopic',
    'quiz_template' : 'quizFutureTopic',
    'display_fields' : [],
    'summary_field' : 'topic',
    'secondary_field' : '',
    'question_field' : '',
    'question_label' : '',
    'answer_field' : 'topic',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':false,
  },
  'concept' : {
    'label' : 'Key Concept',
    'icon' : 'fa-key',
    'template' : 'Concept',
    'create_template' : 'createConcept',
    'quiz_template' : 'quizConcept',
    'display_fields' : [],
    'summary_field' : 'concept',
    'secondary_field' : 'details',
    'question_field' : 'concept',
    'question_label' : 'Please describe the following concept: ',
    'answer_field' : 'details',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'definition' : {
    'label' : 'Definition',
    'icon' : 'fa-book',
    'template' : 'Definition',
    'create_template' : 'createDefinition',
    'quiz_template' : 'quizDefinition',
    'display_fields' : [],
    'summary_field' : 'term',
    'secondary_field' : 'definition',
    'question_field' : 'term',
    'question_label' : 'Please define ',
    'answer_field' : 'definition',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'agreement' : {
    'label' : 'Agreement',
    'icon' : 'fa-plus',
    'template' : 'Reaction',
    'create_template' : 'createReaction',
    'quiz_template' : 'quizReaction',
    'display_fields' : [],
    'summary_field' : 'text',
    'secondary_field' : 'reaction',
    'question_field' : 'text',
    'question_label' : 'Why do you agree with the following text: ',
    'answer_field' : 'reaction',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'disagreement' : {
    'label' : 'Disagreement',
    'icon' : 'fa-minus',
    'template' : 'Reaction',
    'create_template' : 'createReaction',
    'quiz_template' : 'quizReaction',
    'display_fields' : [],
    'summary_field' : 'text',
    'secondary_field' : 'reaction',
    'question_field' : 'text',
    'question_label' : 'Why do you disagree with the following text: ',
    'answer_field' : '',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  'timeline' : {
    'label' : 'Timeline',
    'icon' : 'fa-list',
    'template' : 'Timeline',
    'create_template' : 'createTimeline',
    'quiz_template' : 'quizTimeline',
    'display_fields' : [],
    'summary_field' : 'title',
    'secondary_field' : 'details',
    'question_field' : 'title',
    'question_label' : 'When did the following event occur: ',
    'answer_field' : 'event_date',
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':true,
    'quiz_auto_grade' : true
  },
  'verify' : {
    'label' : 'Verification',
    'icon' : 'fa-check',
    'template' : 'Verification',
    'create_template' : 'createVerification',
    'quiz_template' : 'quizVerification',
    'display_fields' : [],
    'summary_field' : 'text',
    'secondary_field' : 'whyVerify',
    'question_field' : 'text',
    'question_label' : 'Why do you want to verify the following text: ',
    'answer_field' : 'whyVerify',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },
  // 'mneumonic' : {
  //   'label' : 'Mneumonics',
  //   'icon' : 'fa-graduation-cap',
  //   'template' : 'Mneumonic',
  //   'display_fields' : [],
  //   'summary_field' : ''
  // },
  'inspiration' : {
    'label' : 'Inspiration',
    'icon' : 'fa-lightbulb-o',
    'template' : 'Inspiration',
    'create_template' : 'createInspiration',
    'quiz_template' : 'quizInspiration',
    'display_fields' : [],
    'summary_field' : 'inspiration',
    'question_field' : '',
    'question_label' : '',
    'answer_field' : 'inspiration',
    'secondary_field' : '',
    'outline' : false,
    'quiz':false,
    'allow_question':true,
    'quiz_auto_grade' : false
  },  
}

getInteractionMeta = function(key){
  if(key in interactionMeta){
    return interactionMeta[key];
  }
  return '';
}

getTemplateOption = function(key){
  if(key in templateOptionHelpers){
    return templateOptionHelpers[key];
  }
  return '';
}


function arrayify(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;  
}

Template.registerHelper('arrayify',function(obj){
  arrayify(obj);
});

Template.registerHelper('interactionList', function(){
  return arrayify(interactionMeta);
});

Template.registerHelper('builderOptionList', function(){
  return arrayify(templateOptionHelpers);
});

Template.registerHelper('templateIcon', function(key){
  if(key in interactionMeta){
    return interactionMeta[key].icon;
  }
  return '';
});

Template.registerHelper('templateLabel', function(key){
  if(key in interactionMeta){
    return interactionMeta[key].label;
  }
  return '';
});

Template.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
        return {index: index, value: val};
    });
});

Template.registerHelper('addIndexOne', function (all) {
    return _.map(all, function(val, index) {
        return {index: (index + 1), value: val};
    });
});

Template.registerHelper('templateCreate', function(key){
  if(key in interactionMeta){
    return 'create' + interactionMeta[key].template;
  }
  return '';
});

Template.registerHelper('templateUpdate', function(key){
  if(key in interactionMeta){
    return 'detail' + interactionMeta[key].template;
  }
  return '';
});

Template.registerHelper('interactionMeta', function(key){
  getInteractionMeta(key);
});

Template.registerHelper("prettifyDate", function(timestamp) {
    if(!timestamp){
      return '';
    }
    var date = new Date(timestamp);
    return moment(date).format('MM/DD/YYYY');
});
