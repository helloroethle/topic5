Template.createArticle.rendered = function(){
  $('.tags-input').tagsinput();
  this.editor = new MediumEditor('.editable', { 
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'orderedlist', 'unorderedlist']
    },
    buttonLabels: 'fontawesome' 
  });
  // Session.set('popoverTemplate', 'createNote');
  // Tracker.autorun(function () {
  //   var popoverTemplate = Session.get('popoverTemplate');
  //   $('.trigger-popup').popover('show');
  //   Blaze.render(Template.createTopic, $('.popover-content').get(0));
  // });
}

Template.createArticle.events({
  'click .add-link' : function(e){
    $('#linkModal').modal();
  },
  'click .import-article': function (e, template) {
    $('#linkModal').modal('hide');
    var link = template.find('[name=addlink]').value;
    Meteor.call("getReadabilityArticle", link, function(error, results) {
      results = JSON.parse(results.content);
      console.log(results);
      template.find('[name=url]').value = results.url;
      template.find('[name=source]').value = results.domain;
      template.find('[name=title]').value = results.title;
      template.find('[name=author]').value = results.author;
      template.find('[name=published]').value = results.date_published;
      template.find('[name=summary]').value = results.excerpt;
      template.editor.destroy();
      template.find('[name=html]').value = results.content;
      template.editor.setup();
      // $('div.editable').text(results.content);
    });
    // Meteor.call('getGraityArticle', link, function(error, results){
    //   template.find('[name=url]').value = results.canonicalLink;
    //   // template.find('[name=source]').val(results.url);
    //   template.find('[name=title]').value = results.title;
    //   // template.find('[name=author]').val(results.url);
    //   // template.find('[name=published]').val(results.url);
    //   // template.find('[name=summary]').val(results.url);
    //   template.find('.editable').value = results.text;
    //   template.find('[name=html]').value = results.text;
    // });
  }
});