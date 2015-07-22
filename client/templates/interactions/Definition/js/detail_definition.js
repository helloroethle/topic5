Template.detailDefinition.events({
  'click .btn-template-delete': function(e) {
      Definitions.remove(this._id);
  }
})

Template.detailDefinition.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailDefinition.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
    },
    hasQuestion: function (){
      if(this.question && this.question.length > 0){
        console.log('has question');
        return '';
      }
      else{
        console.log('no question');
        return 'hide';
      }
    }
});
