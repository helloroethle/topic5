Template.templateParagraph.helpers({
  isRequired: function () {
    if(this.value.required){
      return 'required';
    }
    return '';
  }
});