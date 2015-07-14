// Example of registering a global template helper
// UI.registerHelper('color', function (parameter) {
//     return Session.equals('color', parameter) ? 'blue' : 'red';
// });

templateOptionHelpers = {
  'text' : {
    'label' : 'Text',
    'icon' : 'fa-font',
    'display' : 'displayText',
    'edit' : 'editText'
  },
  'paragraph' : {
    'label' : 'Paragraph',
    'icon' : 'fa-paragraph',
    'display' : 'displayParagraph',
    'edit' : 'editParagraph'
  },
  'checkbox' : {
    'label' : 'Check Box',
    'icon' : 'fa-square-o',
    'display' : 'displayCheckbox',
    'edit' : 'editCheckbox'
  },
  'multiple_choice' : {
    'label' : 'Multiple Choice',
    'icon' : 'fa-circle-o',
    'display' : 'displayMultipleChoice',
    'edit' : 'editMultipleChoice'
  },
  'select' : {
    'label' : 'Dropdown',
    'icon' : 'fa-caret-down',
    'display' : 'displayDropdown',
    'edit' : 'editDropdown'
  },
  'true_false' : {
    'label' : 'True/False',
    'icon' : 'fa-toggle-on',
    'display' : 'displayTrueFalse',
    'edit' : 'editTrueFalse'
  },
  'header' : {
    'label' : 'Header',
    'icon' : 'fa-header',
    'display' : 'displayHeader',
    'edit' : 'editHeader'
  },
  'section' : {
    'label' : 'Section Break',
    'icon' : 'fa-minus',
    'display' : 'displaySection',
    'edit' : 'editSection'
  },
  'info' : {
    'label' : 'Info Section',
    'icon' : 'fa-info',
    'display' : 'displayInfo',
    'edit' : 'editInfo'
  }
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
    'quiz':false
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
    'quiz':true
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
    'quiz':false
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
    'quiz':true
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
    'quiz':true
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
    'quiz':true
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
    'quiz':true
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
    'quiz':false
  },
  'topic' : {
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
    'quiz':false
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
    'quiz':false
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
    'quiz':true
  },
  'agree' : {
    'label' : 'Agreement',
    'icon' : 'fa-plus',
    // 'icon' : 'fa-sliders',
    'template' : 'Reaction',
    'create_template' : 'createReaction',
    'quiz_template' : 'quizReaction',
    'display_fields' : [],
    'summary_field' : 'text',
    'secondary_field' : 'reaction',
    'outline' : true,
    'collection' : '',
    'quiz':true
  },
  'disagree' : {
    'label' : 'Disagreement',
    'icon' : 'fa-minus',
    // 'icon' : 'fa-sliders',
    'template' : 'Reaction',
    'create_template' : 'createDisagreement',
    'quiz_template' : 'quizDisagreement',
    'display_fields' : [],
    'summary_field' : 'text',
    'secondary_field' : 'reaction',
    'outline' : true,
    'collection' : '',
    'quiz':true
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
    'quiz':true
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
    'quiz':false
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
    'quiz':false
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
