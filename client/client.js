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
          console.log(Interactions.insert({
            'resourceId' : this.docId, 
            'data' : this.insertDoc,
            'key' : interactionKey,
            'meta': interactionMeta,
          }, function(){
            console.log('inspiration has been inserted');
          }));
          console.log('interation meta');
          console.log(getInteractionMeta(this.formId.replace('create', '')));
          console.log('this is before the insert document gets printed');
          console.log(this);
          Session.set(this.docId, this.insertDoc);
          var detailsTemplateName = Session.get('templateName').replace('create', 'detail');
          $(classSelector).data('resource', this.docId).data('template', detailsTemplateName);
          $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
          Session.set('templateName', '');
          Session.set('highlighted_text', '');
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




