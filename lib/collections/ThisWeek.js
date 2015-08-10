ThisWeeks = new Mongo.Collection('thisWeeks');

var ThisWeeksSchema = new SimpleSchema({
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  topics: {
    type: [Object],
    optional: true
  },
  userId: {
    type: String
  },
  prev: {
    type: String,
    optional: true
  },
  next: {
    type: String,
    optional: true
  }
});


// topic list
// {topic: '', count: '', articles: ''}
ThisWeeks.allow({
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