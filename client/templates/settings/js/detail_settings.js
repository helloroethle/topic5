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
    var colorHue = Session.get('color_hue');
    if(!colorHue){
      colorHue = 'random';
    }
    return randomColor({hue: colorHue, count: 28});
  }
});

Template.detailSettings.events({
  'click .btn-primary': function () {
    Session.set('helloColors', randomColor());
  },
  'change #colorHue':function(e){
    var newValue = $(e.target).val();
    Session.set("color_hue", newValue);
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