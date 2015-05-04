var TimelineItemSchema = new SimpleSchema({
  title: {
    type: String,
    defaultValue: '',
    trim: true
  },
  event_date: {
    type: Date
  },
  created: {
    type: Date,
    defaultValue: Date.now
  },
  level: {
    type: Number,
    defaultValue: 0
  },
  userArticleId: {
    type: String
  }
});

var TimelineSchema = new SimpleSchema({
  events:{
    type: [TimelineItemSchema]
  }
})

Timelines = new Meteor.Collection("timelines");

Timelines.attachSchema(TimelineSchema);