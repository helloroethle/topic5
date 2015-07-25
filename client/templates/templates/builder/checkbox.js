// Template.templateCheckbox.helpers({
//   required: function () {
//     if(this.required){
//       return 'required';
//     }
//     else{
//       return '';
//     }
//   }
// });

Template.templateCheckbox.events({
  'click .sidebar-menu-items li': function (e) {
    if($(e.currentTarget).find('i').hasClass('fa-square-o')){
      $(e.currentTarget).find('i').removeClass('fa-square-o');
      $(e.currentTarget).find('i').addClass('fa-check-square-o');
    }
    else{
      $(e.currentTarget).find('i').removeClass('fa-check-square-o');
      $(e.currentTarget).find('i').addClass('fa-square-o');
    }
  }
});