Template.previewTemplate.rendered = function () {
    var formWrap = document.getElementById( 'fs-form-wrap' );
    new FForm( formWrap, {
      onReview : function() {
        classie.add( document.body, 'overview' ); 
      }
    } );
};