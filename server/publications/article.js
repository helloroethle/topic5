Meteor.publish('singleArticle', function(articleId) {
  check(articleId, String);

  return Articles.find({_id: articleId});
});

Meteor.publish('articles', function() {
  return Articles.find({}, {sort: { published: -1 }});
});

Meteor.methods({
  getPopularArticles: function() {
    return Articles.aggregate([{"$group" : {_id:"$url", count:{$sum:1}}}]);
  },
  getTags: function(){
    return Articles.aggregate([
       { "$project": { "tags":1 }},  
       { "$unwind": "$tags" },  
       { "$group": { "_id": "$tags", "count": { "$sum": 1 } } } 
    ]);
  }
});