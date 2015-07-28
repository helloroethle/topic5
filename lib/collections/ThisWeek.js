ThisWeeks = new Mongo.Collection('thisWeeks');

var ThisWeeksSchema = new SimpleSchema({
  start_date: {
    type: String
  },
  end_date: {
    type: String
  },
  topicList: {
    type: [Object]
  },
  userId: {
    type: String
  },
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