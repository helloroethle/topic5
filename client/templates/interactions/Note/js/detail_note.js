Template.detailNote.events({
  'click .btn-template-delete': function(e) {
      Notes.remove(this._id);
  }
})

Template.detailNote.destroyed = function () {
  console.log('note destroyed');
};

Template.detailNote.helpers({
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
    }
});


Template.detailNote.rendered = function(){
  $('.tags-input').tagsinput();
}