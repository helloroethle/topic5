AutoForm.addHooks(['createQuote', 'createCategory', 'createDefinition', 'createFact', 'createFlashCard', 'createFutureTopic',
  'createIdea', 'createInspiration', 'createConcept', 'createNote', 'createResponseQuiz', 'createMCQuiz', 'createTFQuiz',
  'createReaction', 'createTimeline', 'createVerification'], {
    after: {
      insert: function(error, result) {
        if (error) {
        console.log("Insert Error:", error);
        } 
        else {
          console.log('hello client');
          // clean up dom manipulation stuff
          $('#wrapper').removeClass('toggled');//.removeClass('full').removeClass('create');
          $('.article-post').removeClass('add-highlights').removeClass('add-icons');
          // clean up current highlight and move it to a solidified state
          $('.current-highlight').removeClass('current-highlight');

          var index = Session.get('highlight_index');
          var classSelector = '.highlight-section-' + index;
          
          this.insertDoc._id = this.docId;
          // update so change so i do not repeatedly do this stupidness
          var interactionKey = Session.get('templateKey'); //this.formId.replace('create', '').toLowerCase();
          var interactionMeta = getInteractionMeta(interactionKey);
          var detailsTemplateName = Session.get('templateName').replace('create', 'detail');
          var interactionObject = {
            'articleId' : Session.get('articleId'),
            'resourceId' : this.docId, 
            'key' : interactionKey,
            'meta': interactionMeta,
            'order': index,
            'outline': true,
            'show' : true,
            'detailTemplate' : this.formId.replace('create', 'detail'),
            'quiz' : interactionMeta.quiz,
            'userId': Meteor.userId(),
            // 'highlight':window.highlighter.serialize()
          }
          var iconSelector = '.icon-' + index;
          if($(iconSelector).length > 0){
            $(iconSelector).removeClass('current');
            var iconParagraph = $('#article-text p').index($(iconSelector).first().parents('p'))
            var iconClasses = $(iconSelector)[0].classList.toString();
            var iconObject = {
              'paragraph_index' : iconParagraph,
              'class' : iconClasses,
              'resource' : this.docId,
              'template' : detailsTemplateName,
              'key' : interactionKey,
              'highlight_index' : index
            }
            // add to article icon array
            Articles.update({'_id': Session.get('articleId')}, 
              { $addToSet: { icons:  iconObject} });

            $(iconSelector).attr('data-resource', this.docId).attr('data-key', interactionKey).attr('data-template', detailsTemplateName).attr('data-index', index);
          }


          interactionObject = _.extend(interactionObject, this.insertDoc);
          delete interactionObject['_id'];
          Interactions.insert( interactionObject );
          // Session.set(this.docId, this.insertDoc);
          $(classSelector).attr('data-resource', this.docId).attr('data-key', Session.get('templateKey')).attr('data-template', detailsTemplateName);//.attr('data-index', index);
          Session.set('templateName', '');
          Session.set('templateKey', '');
          Session.set('highlighted_text', '');
          Session.set('highlight_index', (index + 1));
          // TODO THIS NEEDS TO BE REFACTORED - Terrible hack
          Session.set('interactionFilterKeys','hello');
          // update the higlight serialization 
          // ideally we would tack this on as a list of strings so that the array could be updated one by one instead of sending the entire serialization string to the server
          Articles.update({'_id': Session.get('articleId')},
            {
              $inc: {  "highlightIndex": 1 },
              $set : { highlights : window.hltr.serializeHighlights() } 
            });
        }
      }
    },
    before: {
      insert: function(doc){
        console.log('hello insert');
        doc.userid = Meteor.userId();
        if(Session.get('templateName') == 'createReaction'){
          if(Session.get('agree')){
            doc.agreement = true;
          }
          else{
            doc.agreement = false;
          }
          doc.agreement_score = $('.rating-bubble.selected').text();
        }

        if(Session.equals('templateName', 'createTFQuiz') || Session.equals('templateName', 'createResponseQuiz')){
          doc.quiz = true;
        }
        else if(Session.get('templateName') == 'createMCQuiz' && Session.get('mc_answer')){
          doc.answer = Session.get('mc_answer')
          doc.quiz = true;
        }
        else if(Session.get('is_quiz')){
          doc.question = Session.get('default_question');
          doc.answer = Session.get('default_answer');
          doc.quiz = true;
        }

        if($('#sidebar-content .question-container input').length > 0 && $('#sidebar-content .question-container input').val() != ''){
          doc.question = $('#sidebar-content .question-container input').val();
          $('#sidebar-content .question-container input').val('');
          doc.quiz = true;
          var key = Session.get('current_answer_key');
          if(key){
            doc.answer = doc[key];
            doc.key = key;
          }
          else{
            var interactionKey = Session.get('templateName').replace('create', '').toLowerCase();
            var interactionMeta = getInteractionMeta(interactionKey);
            if(interactionMeta.allow_question){
              doc.answer = doc[interactionMeta.answer_field];  
              doc.key = interactionMeta.answer_field;
            }
          }
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
        // doc.userid = Meteor.userId();
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
        console.log('updated');
        if(this.formId.indexOf("detail") > -1){
          if(error){
            console.log("Update Error:", error);
          }
          else {
            $('#wrapper').removeClass('toggled');
            $('.current-selected-highlight').removeClass('current-selected-highlight');
            var templateName = Session.get('templateName').replace('create', 'detail');
            var templateKey = Session.get('templateKey');
            var index = Session.get('currentIndex');
            Session.set('templateName', '');
            Session.set('templateKey', '');
            // var interaction = Interactions.findOne({resourceId: this.docId});
            var interactionUpdate = this.updateDoc;
            delete interactionUpdate['_id'];
            delete interactionUpdate['resourceId'];
            var interactionObject = Interactions.findOne({'resourceId': this.docId});
            if(interactionObject && interactionObject._id){
              Interactions.update({'_id': interactionObject._id}, interactionUpdate );
            }

            // process any icon update
            console.log('this is icon update section');
            var iconSelector = '.icon-' + index;
            if($(iconSelector).length > 0){
              $(iconSelector).attr('data-resource', this.docId).attr('data-key', templateKey).attr('data-template', templateName).attr('data-index', index);
              $(iconSelector).removeClass('current');
              var iconParagraph = $('#article-text p').index($(iconSelector).first().parents('p'))
              var iconClasses = $(iconSelector)[0].classList.toString();
              var iconObject = {
                'paragraph_index' : iconParagraph,
                'class' : iconClasses,
                'resource' : this.docId,
                'template' : templateName,
                'key' : templateKey,
                'highlight_index' : index
              }
              // add to article icon array
              Articles.update({'_id': Session.get('articleId')}, 
                  { $pull: { icons: {'resource':this.docId} } });
              Articles.update({'_id': Session.get('articleId')}, 
                { $addToSet: { icons:  iconObject} });
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
        console.log('update quiz update updated');
        if(this.currentDoc.quiz == true && Session.equals('is_quiz_question', false)){
          doc.$set.answer = '';
          doc.$set.key = '';
          doc.$set.question = '';
          doc.$set.quiz = false;
        }
        else if($('#sidebar-content .question-container input').length > 0 && $('#sidebar-content .question-container input').val() != ''){
          doc.$set.question = $('#sidebar-content .question-container input').val();
          $('#sidebar-content .question-container input').val('');
          doc.$set.quiz = true;
          var key = Session.get('current_answer_key');
          if(key){
            doc.$set.answer = this.currentDoc[key];
            doc.$set.key = key;
          }
          else{
            var interactionKey = Session.get('templateName').replace('create', '').toLowerCase();
            var interactionMeta = getInteractionMeta(interactionKey);
            if(interactionMeta.allow_question){
              doc.$set.answer = this.currentDoc[interactionMeta.answer_field];  
              doc.$set.key = interactionMeta.answer_field;
            }
          }
        }
        if(Session.get('templateName') == 'detailMCQuiz' && Session.get('mc_answer')){
          doc.$set.answer = Session.get('mc_answer');
        }
        if($('.tags-input').val() != ''){
          doc.$set.tags = $('.tags-input').val();
        }
        return doc; 
      }
    }
  }
);




