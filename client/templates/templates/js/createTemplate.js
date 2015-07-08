Template.createTemplate.rendered = function () {
  Sortable.create( $('.builder-option-list').get(0), 
    {
      group: {
        name : 'builder',
        pull: 'clone',
        put: false
      },
      ghostClass: "sortable-ghost",
      sort : false
    }
  );
  Sortable.create($('.builder-question-list').get(0), 
    {
      group: {
        name : 'builder',
        put : true
      },
      ghostClass: "sortable-ghost-question",
      onAdd: function(e){
        var itemEl = e.item;
        $(itemEl).find('i').remove();
      }
    }
  );
};  


// Template.createTemplate.helpers({

// });

// Template.createTemplate.events({

// });