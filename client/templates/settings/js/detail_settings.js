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
  },
  colorSelection: function(){
    var colorHue = Session.get('color_hue');
    if(!colorHue){
      colorHue = 'Random';
    }
    return colorHue;
  }
});

Template.detailSettings.events({
  'click .btn-primary': function () {
    Session.set('helloColors', randomColor());
  },
  'click #colorHue .dropdown-menu li a':function(e){
    e.preventDefault();
    var newValue = $(e.target).attr('data-value');
    Session.set("color_hue", newValue);
    $('#colorDropdown').dropdown('toggle');
    return false;
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