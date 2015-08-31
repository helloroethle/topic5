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
        return '';
      }
      else{
        return 'hide';
      }
    },
    hasTags: function (){
      if(this.tags && this.tags.length > 0){
        return '';
      }
      else{
        return 'hide';
      }
    }
});
