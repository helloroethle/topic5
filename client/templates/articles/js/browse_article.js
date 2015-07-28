Template.browseArticle.helpers({
    popular_articles: function () {
      console.log(Template.instance().popular_articles.get());
        return Template.instance().popular_articles.get();
    }
});



Template.browseArticle.created = function (){
    var self = this;
    self.popular_articles = new ReactiveVar();
    Meteor.call('getPopularArticles', function (err, value) {
        if (err)
            console.log(err);
        else 
            self.popular_articles.set(value);
    });
}

