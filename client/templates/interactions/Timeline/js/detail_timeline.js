Template.detailTimeline.events({
  'click .btn-template-delete': function(e) {
      Timelines.remove(this._id);
  }
})

Template.detailTimeline.rendered = function(){
  $('.tags-input').tagsinput();
}

Template.detailTimeline.helpers({
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
