Template.detailInspiration.events({
  'click .btn-template-delete': function(e) {
      Inspirations.remove(this._id);
  }
})

Template.detailInspiration.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailInspiration.helpers({
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
