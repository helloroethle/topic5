Template.detailTFQuiz.events({
  'click .btn-template-delete': function(e) {
      TFQuizes.remove(this._id);
  }
})

Template.detailTFQuiz.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailTFQuiz.helpers({
    makeUniqueID: function () {
      return "detail-form-" + this._id;
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
