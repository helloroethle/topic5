Template.detailSettings.rendered = function () {
  // var el = document.getElementById('items');
  // var sortable = Sortable.create(el);

// var foo = document.getElementById("foo");
// Sortable.create(foo, { group: "omega" });

// var bar = document.getElementById("bar");
// Sortable.create(bar, { group: "omega" });
};  

Template.detailSettings.helpers({
  colors: function () {
    Session.get('helloColors');
    return randomColor({count: 15});
  }
});

Template.detailSettings.events({
  'click .btn-primary': function () {
    Session.set('helloColors', randomColor());
  },
  'dragstart .swatch':function(e){
    Session.set('currentColor', this.toString());
  },
  'dragover .add-interaction-list li':function(e){
    e.preventDefault();
  },
  'drop .add-interaction-list li':function(e){
    if($(e.target).hasClass('fa')){
      $(e.target).parent().css('background', Session.get('currentColor'));
    }
    else{
      $(e.target).css('background', Session.get('currentColor'));
    }
    
  }
});