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
          $('.article-post').removeClass('add-highlights').removeClass('add-icons');
          var index = Session.get('highlight_index');
          var classSelector = '.highlight-section-' + (index - 1);
          var iconSelector = '.icon-' + (index - 1);
          this.insertDoc._id = this.docId;
          var interactionKey = this.formId.replace('create', '').toLowerCase();
          var interactionMeta = getInteractionMeta(interactionKey);
          var interactionObject = {
            'articleId' : Session.get('articleId'),
            'resourceId' : this.docId, 
            'key' : interactionKey,
            'meta': interactionMeta,
            'order': (index - 1),
            'outline': true,
            'show' : true,
            'detailTemplate' : this.formId.replace('create', 'detail'),
            'quiz' : interactionMeta.quiz
          }
          if(Session.get('highlighted_text')){
            interactionObject.paragraph_start = Session.get('paragraph_start');
            interactionObject.highlight_start = Session.get('highlight_start'); 
            interactionObject.highlight_length = Session.get('highlighted_text').length;         
          }
          interactionObject = _.extend(interactionObject, this.insertDoc);
          delete interactionObject['_id'];
          Interactions.insert( interactionObject );
          Session.set(this.docId, this.insertDoc);
          var detailsTemplateName = Session.get('templateName').replace('create', 'detail');
          $(classSelector).data('resource', this.docId).data('template', detailsTemplateName).data('index', index - 1).data('offset', interactionObject.highlight_start).data('length', interactionObject.highlight_length);
          $(iconSelector).data('resource', this.docId).data('template', detailsTemplateName).data('index', index - 1).removeClass('current');
          Session.set('templateName', '');
          Session.set('highlighted_text', '');
          Session.set('interactionFilterKeys','hello');
        }
      }
    },
    before: {
      insert: function(doc){
        if(Session.get('templateName') == 'createMCQuiz' && Session.get('mc_answer')){
          doc.answer = Session.get('mc_answer')
        }
        if(Session.get('templateName') == 'createTimeline'){
          if(Session.get('agree')){
            doc.agreement = true;
          }
          else{
            doc.agreement = false;
          }
          doc.agreement_score = $('.rating-bubble.selected').text();
        }
        if($('#sidebar-content .question-container input').length > 0 && $('#sidebar-content .question-container input').val() != ''){
          doc.question = $('#sidebar-content .question-container input').val();
          doc.quiz = true;
        }
        if($('.tags-input').val() != ''){
          doc.tags = $('.tags-input').val();
        }
        return doc; 
      }
    }
});

AutoForm.addHooks(['createArticle'], {
    before: {
      insert: function(doc){
        // console.log(doc.html);
        // if(doc.html){
          // doc.html = '<div><p>' + doc.html.replace(/\n([ \t]*\n)+/g, '</p><p>').replace('\n', '<br />').replace(/<p><\/p>/g, ""); + '</p></div>';
          // doc.html = doc.html.replace(/\n([ \t]*\n)+/g, '</p><p>')
        // }

        if($('.tags-input').val() != ''){
          doc.tags = $('.tags-input').val();
        }
        return doc; 
      }
    },
    after: {
      insert: function(error, result){
        if (error) {
        console.log("Insert Error:", error);
        } 
        else {
          Router.go('detailArticle', {_id: this.docId}); 
        }
      }
    }
});

// AutoForm.addHooks(['detailQuote', 'detailCategory', 'detailDefinition', 'detailFact', 'detailFlashCard', 'detailFutureTopic',
//   'detailIdea', 'detailInspiration', 'detailConcept', 'detailNote', 'detailResponseQuiz', 'detailMCQuiz', 'detailTFQuiz',
//   'detailReaction', 'detailTimeline', 'detailVerification'], {
  AutoForm.addHooks(null, {
    after: {
      update: function(error, result) {
        if(this.formId.indexOf("detail") > -1){
          if(error){
            console.log("Update Error:", error);
          }
          else {
            $('#wrapper').removeClass('toggled');
            Session.set('templateName', '');
            // var interaction = Interactions.findOne({resourceId: this.docId});
            var interactionUpdate = this.updateDoc;
            console.log(this.updateDoc);
            delete interactionUpdate['_id'];
            delete interactionUpdate['resourceId'];
            var interactionObject = Interactions.findOne({'resourceId': this.docId});
            if(interactionObject && interactionObject._id){
              console.log(Interactions.update({'_id': interactionObject._id}, interactionUpdate ));
            }
            // console.log(Interactions.update({'resourceId': this.docId}, {$set: interactionUpdate}));
            // Session.set(this.docId, this.updateDoc);
          }
        }

      }
    },
    before: {
      insert: function(doc){
        if($('.tags-input').val() != ''){
          doc.tags = $('.tags-input').val();
        }
        return doc; 
      },
      update: function(doc){
        if($('.tags-input').val() != ''){
          doc.tags = $('.tags-input').val();
        }
        return doc; 
      }
    }
  }
);




