Template.detailReaction.events({
  'click .btn-template-delete': function(e) {
      Reactions.remove(this._id);
  }
})

Template.detailReaction.rendered = function(){
  $('.tags-input').tagsinput();
  // need to select level of agreement / disagreement
}

Template.detailReaction.helpers({
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
