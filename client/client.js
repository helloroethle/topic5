AutoForm.addHooks(['createQuote', 'createCategory', 'createDefinition', 'createFact', 'createFlashCard', 'createFutureTopic',
  'createIdea', 'createInspiration', 'createConcept', 'createNote', 'createResponseQuiz', 'createMCQuiz', 'createTFQuiz',
  'createReaction', 'createTimeline', 'createVerification'], {
    after: {
      insert: function(error, result) {
        if (error) {
        console.log("Insert Error:", error);
        } 
        else {
          var index = Session.get('highlight_index');
          var classSelector = '.highlight-section-' + (index - 1);
          this.insertDoc._id = this.docId;
          var interactionKey = this.formId.replace('create', '').toLowerCase();
          var interactionMeta = getInteractionMeta(interactionKey);
          Interactions.insert({
            'resourceId' : this.docId, 
            'data' : this.insertDoc,
            'key' : interactionKey,
            'meta': interactionMeta,
            'detailTemplate' : this.formId.replace('create', 'detail')
          }, function(){
            // success
          });
          Session.set(this.docId, this.insertDoc);
          var detailsTemplateName = Session.get('templateName').replace('create', 'detail');
          $(classSelector).data('resource', this.docId).data('template', detailsTemplateName);
          $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
          Session.set('templateName', '');
          Session.set('highlighted_text', '');
          Session.set('iteraction_items', Session.get('interaction_items') + 1);
        }
      }
    },
    before: {
      insert: function(doc){
        if(Session.get('highlighted_text')){
          doc.paragraph_start = Session.get('paragraph_start');
          doc.highlight_start = Session.get('highlight_start'); 
          doc.highlight_length = Session.get('highlighted_text').length;         
        }
        if(Session.get('templateName') == 'createMCQuiz' && Session.get('mc_answer')){
          doc.answer = Session.get('mc_answer')
        }
        if(Session.get('templateName') == 'createTimeline'){
          Session.set('timelineCount', (Session.get('timelineCount') + 1) );
        }
        if($('.tags-input').val() != ''){
          doc.tags = $('.tags-input').val();
        }
        return doc; 
      }
    }
    // onSuccess: function(operation, result, template) {
    //   console.log(operation);
    //   console.log(result);
    //   console.log(template);
    //   console.log(this);
    // }
});


AutoForm.addHooks(['detailQuote', 'detailCategory', 'detailDefinition', 'detailFact', 'detailFlashCard', 'detailFutureTopic',
  'detailIdea', 'detailInspiration', 'detailConcept', 'detailNote', 'detailResponseQuiz', 'detailMCQuiz', 'detailTFQuiz',
  'detailReaction', 'detailTimeline', 'detailVerification'], {
    after: {
      update: function(error, result) {
        if(error){
          console.log("Update Error:", error);
        }
        else {
          Session.set(this.docId, this.updateDoc);
          $('#wrapper').removeClass('toggled');
          Session.set('templateName', '');
        }
      }
    }
  }
);




