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
    'quiz_create_template' : 'quizCreateText'
  },
  'paragraph' : {
    'label' : 'Paragraph',
    'icon' : 'fa-paragraph',
    'display' : 'displayParagraph',
    'edit' : 'editParagraph',
    'template' : 'templateParagraph',
    'quiz_template' : 'quizParagraph',
    'quiz_create_template' : 'quizCreateParagraph'
  },
  'checkbox' : {
    'label' : 'Check Box',
    'icon' : 'fa-square-o',
    'display' : 'displayCheckbox',
    'edit' : 'editCheckbox',
    'template' : 'templateCheckbox',
    'quiz_template' : 'quizCheckbox',
    'quiz_create_template' : 'quizCreateCheckbox'
  },
  'multiple_choice' : {
    'label' : 'Multiple Choice',
    'icon' : 'fa-circle-o',
    'display' : 'displayMultipleChoice',
    'edit' : 'editMultipleChoice',
    'template' : 'templateMultipleChoice',
    'quiz_template' : 'quizMultipleChoice',
    'quiz_create_template' : 'quizCreateMultipleChoice'
  },
  'select' : {
    'label' : 'Dropdown',
    'icon' : 'fa-caret-down',
    'display' : 'displayDropdown',
    'edit' : 'editDropdown',
    'template' : 'templateDropdown',
    'quiz_template' : 'quizSelect',
    'quiz_create_template' : 'quizCreateDropdown'
  },
  'true_false' : {
    'label' : 'True/False',
    'icon' : 'fa-toggle-on',
    'display' : 'displayTrueFalse',
    'edit' : 'editTrueFalse',
    'template' : 'templateTrueFalse',
    'quiz_template' : 'quizTrueFalse',
    'quiz_create_template' : 'quizCreateTrueFalse'
  },
  'rating' : {
    'label' : 'Rating',
    'icon' : 'fa-star',
    'display': 'displayRating',
    'edit': 'editRating',
    'template' : 'templateRating',
    'quiz_template' : 'quizRating',
    'quiz_create_template' : 'quizCreateRating'
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
  },
  'responsequiz' : {
    'label' : 'Response Quiz',
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
    'allow_question':false
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
    'allow_question':false
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
    'allow_question':false
  },
  'flashcard' : {
    'label' : 'Flashcard',
    'icon' : 'fa-list-alt',
    'template' : 'FlashCard',
    'create_template' : 'createFlashCard',
    'quiz_template' : 'quizFlashCard',
    'display_fields' : [],
    'summary_field' : 'front_text',
    'secondary_field' : 'back_text',
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':false
  },
  'idea' : {
    'label' : 'New Idea',
    'icon' : 'fa-info-circle',
    'template' : 'Idea',
    'create_template' : 'createIdea',
    'quiz_template' : 'quizIdea',
    'display_fields' : [],
    'summary_field' : 'idea',
    'secondary_field' : '',
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':false
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':false
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'outline' : true,
    'collection' : '',
    'quiz':true,
    'allow_question':false
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
    'outline' : true,
    'collection' : '',
    'quiz':false,
    'allow_question':true
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
    'secondary_field' : '',
    'outline' : false,
    'quiz':false,
    'allow_question':true
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
