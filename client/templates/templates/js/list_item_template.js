Template.listItemTemplate.events({
  'click .delete' : function(e){
      Templates.remove(this._id);
  }
})