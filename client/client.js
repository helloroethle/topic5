AutoForm.addHooks(['createQuote', 'createCategory', 'createDefinition', 'createFact', 'createFlashCard', 'createTopic',
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
          Session.set('currentDoc', this.insertDoc);
          $(classSelector).data('resource-id', result);
          $('#wrapper').removeClass('toggled');
          Session.set('templateName', '');
        }
      }
    }
});