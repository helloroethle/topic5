AutoForm.addHooks(['createQuote', 'createCategory', 'createDefinition', 'createFact', 'createFlashCard', 'createFutureTopic',
  'createIdea', 'createInspiration', 'createConcept', 'createNote', 'createResponseQuiz', 'createMCQuiz', 'createTFQuiz',
  'createReaction', 'createTimeline', 'createVerification'], {
    after: {
      insert: function(error, result) {
        if (error) {
        console.log("Insert Error:", error);
        } 
        else {
          $('#wrapper').removeClass('toggled').removeClass('full').removeClass('create');
          $('.article-post').removeClass('add-highlights').removeClass('add-icon');
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
            'order': (index - 1),
            'outline': true,
            'show' : true,
            'detailTemplate' : this.formId.replace('create', 'detail')
          }, function(){
            // success
          });
          // if(Session.get('interactions2_id')){
          //   var myId = Session.get('interactions2_id');
          //   Interactions2.update(
          //      { _id: myId },
          //      { $push: { interactions: {resourceId: this.docId, order: (index - 1), key: interactionKey } } }
          //   );
          // }
          // else{
          //   var insertedId = Interactions2.insert({
          //     'articleId': 4,
          //     'interactions': {resourceId: this.docId, order: (index - 1), key: interactionKey } 
          //   });
          //   Session.set('interactions2_id', insertedId);
          // }

          Session.set(this.docId, this.insertDoc);
          var detailsTemplateName = Session.get('templateName').replace('create', 'detail');
          $(classSelector).data('resource', this.docId).data('template', detailsTemplateName);
          Session.set('templateName', '');
          Session.set('highlighted_text', '');
          Session.set('interactionFilterKeys','hello');
          console.log('hello is this being called');
        }
      }
    },
    before: {
      insert: function(doc){
        if(Session.get('highlighted_text')){
          // doc.paragraph_start = Session.get('paragraph_start');
          // doc.highlight_start = Session.get('highlight_start'); 
          // doc.highlight_length = Session.get('highlighted_text').length;         
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
          console.log('client.js - update central!!');
        }
      }
    }
  }
);




