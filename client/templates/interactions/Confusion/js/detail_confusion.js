Template.detailConfusion.events({
  'click .btn-template-delete': function(e) {
      Confusions.remove(this._id);
  }
})

Template.detailConfusion.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailConfusion.helpers({
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
