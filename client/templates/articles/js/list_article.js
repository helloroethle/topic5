Template.listArticle.helpers({
  articles: function() {
    // sort in submitted decending order
    var queryOptions = {
      sort: {submitted: -1}
    };
    return Articles.find({}, queryOptions);
  }
});

Template.listArticle.events({
  'click .importArticle': function (e) {
    var link = 'http://money.cnn.com/2015/07/01/news/economy/greece-bailout-concessions/index.html';
    Meteor.call("getReadabilityArticle", link, function(error, results) {
        console.log(results.content); //results.data should be a JSON object
    });
    Meteor.call('getGraityArticle', link, function(error, results){
        console.log(results);
    });

  }
});