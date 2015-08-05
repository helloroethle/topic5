Template.browseArticle.helpers({
    popular_articles: function () {
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

