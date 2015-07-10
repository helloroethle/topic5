// var TemplateSchema = new SimpleSchema({
//   title: {
//     type: String,
//     defaultValue: '',
//     trim: true
//   },
//   questions: {
//     type: [Object]
//   },
//   created: {
//     type: Date,
//     autoValue: function() {
//       if (this.isInsert) {
//         return new Date;
//       } else if (this.isUpsert) {
//         return {$setOnInsert: new Date};
//       } else {
//         this.unset();
//       }
//     }
//   },
// });

Templates = new Meteor.Collection("templates");
Templates.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function (){
    return true;
  },
});
// Templates.attachSchema(TemplateSchema);