Template.templateParagraph.helpers({
  isRequired: function () {
    if(this.value.required){
      return 'required';
    }
    return '';
  }
});

// Template.quizParagraph.events({
//   'blur textarea.answer': function (e) {
//     console.log(e.currentTarget.value);
//   }
// });