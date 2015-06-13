// Example of registering a global template helper
// UI.registerHelper('color', function (parameter) {
//     return Session.equals('color', parameter) ? 'blue' : 'red';
// });

interactionMeta = {
  'note' : {
    'label' : 'Note',
    'icon' : 'fa-pencil-square-o',
    'template' : 'Note',
    'display_fields' : [],
    'summary_field' : 'note'
  },
  'quote' : {
    'label' : 'Quote',
    'icon' : 'fa-quote-left',
    'template' : 'Quote',
    'display_fields' : [],
    'summary_field' : 'quote'
  },
  'fact' : {
    'label' : 'Fact',
    'icon' : 'fa-exclamation',
    'template' : 'Fact',
    'display_fields' : [],
    'summary_field' : 'fact'
  },
  'responsequiz' : {
    'label' : 'Response Quiz',
    'icon' : 'fa-bullhorn',
    'template' : 'ResponseQuiz',
    'display_fields' : [],
    'summary_field' : 'question'
  },
  'mcquiz' : {
    'label' : 'Multiple Choice Quiz',
    'icon' : 'fa-list-ol',
    'template' : 'MCQuiz',
    'display_fields' : [],
    'summary_field' : 'question'
  },
  'tfquiz' : {
    'label' : 'True False Quiz',
    'icon' : 'fa-toggle-on',
    'template' : 'TFQuiz',
    'display_fields' : [],
    'summary_field' : 'question'
  },
  'flashcard' : {
    'label' : 'Flashcard',
    'icon' : 'fa-list-alt',
    'template' : 'FlashCard',
    'display_fields' : [],
    'summary_field' : 'front_text'
  },
  'idea' : {
    'label' : 'New Idea',
    'icon' : 'fa-info-circle',
    'template' : 'Idea',
    'display_fields' : [],
    'summary_field' : 'idea'
  },
  'topic' : {
    'label' : 'Future Topic',
    'icon' : 'fa-share',
    'template' : 'FutureTopic',
    'display_fields' : [],
    'summary_field' : 'topic'
  },
  'concept' : {
    'label' : 'Key Concept',
    'icon' : 'fa-key',
    'template' : 'Concept',
    'display_fields' : [],
    'summary_field' : 'concept'
  },
  'definition' : {
    'label' : 'Definition',
    'icon' : 'fa-book',
    'template' : 'Definition',
    'display_fields' : [],
    'summary_field' : 'term'
  },
  'agree' : {
    'label' : 'Agreement',
    'icon' : 'fa-plus',
    // 'icon' : 'fa-sliders',
    'template' : 'Reaction',
    'display_fields' : [],
    'summary_field' : 'text'
  },
  'disagree' : {
    'label' : 'Disagreement',
    'icon' : 'fa-minus',
    // 'icon' : 'fa-sliders',
    'template' : 'Reaction',
    'display_fields' : [],
    'summary_field' : 'text'
  },
  'timeline' : {
    'label' : 'Timeline',
    'icon' : 'fa-list',
    'template' : 'Timeline',
    'display_fields' : [],
    'summary_field' : 'details'
  },
  'verify' : {
    'label' : 'Verification',
    'icon' : 'fa-check',
    'template' : 'Verification',
    'display_fields' : [],
    'summary_field' : 'text'
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
    'display_fields' : [],
    'summary_field' : 'inspiration'
  },  
}

getInteractionMeta = function(key){
  if(key in interactionMeta){
    return interactionMeta[key];
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
})

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
})

Template.registerHelper('templateCreate', function(key){
  if(key in interactionMeta){
    return 'create' + interactionMeta[key].template;
  }
  return '';
})

Template.registerHelper('templateUpdate', function(key){
  if(key in interactionMeta){
    return 'detail' + interactionMeta[key].template;
  }
  return '';
})

Template.registerHelper('interactionMeta', function(key){
  getInteractionMeta(key);
})
