var extractor = Meteor.npmRequire('unfluff');

Meteor.methods({
    getReadabilityArticle: function (link) {
      check(link, String);
      var api_token = '9ff5ea34df7bb1556464c3d29027148f1ab02841';
      return Meteor.http.get('https://readability.com/api/content/v1/parser?url=' + link + '&token=' + api_token);        
    },
    getGraityArticle: function (link){
      check(link, String);
      var html = Meteor.http.get(link);
      var data = extractor(html.content.toString());
      return data;
    },
});