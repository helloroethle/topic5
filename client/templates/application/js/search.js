Template.search.events({
  'keypress .main-search input': function (e) {
    if(e.which === 13){
      Session.set('search', $('.main-search input').val());
    }
  }
});

Template.search.helpers({
  search_term: function () {
    return Session.get('search');
  },
  // topicResults: function (){
  //   // sort in submitted decending order
  //   var queryOptions = {
  //     sort: {title: 1}
  //   };
  //   var keyword = Session.get('search');
  //   console.log('topic resuts');
  //   console.log(keyword);
  //   var query = new RegExp( keyword, 'i') ;
  //   return Topics.find({'title': query}, queryOptions);
  // },
  // tagResults: function (){
  //   // sort in submitted decending order
  //   var queryOptions = {
  //     sort: {title: 1}
  //   };
  //   var keyword = Session.get('topic_search_query');
  //   var query = new RegExp( keyword, 'i') ;
  //   return Topics.find({'title': query}, queryOptions);
  // },
  articleResults: function (){
    // sort in submitted decending order
    var queryOptions = {
      sort: {title: 1}
    };
    var keyword = Session.get('search');
    var query = new RegExp( keyword, 'i') ;
    return Articles.find({'title': query}, queryOptions);
  },
  // templateResults: function (){
  //   // sort in submitted decending order
  //   var queryOptions = {
  //     sort: {title: 1}
  //   };
  //   var keyword = Session.get('search');
  //   var query = new RegExp( keyword, 'i') ;
  //   return Templates.find({'title': query}, queryOptions);
  // },
  // quizResults: function (){
  //   // sort in submitted decending order
  //   var queryOptions = {
  //     sort: {title: 1}
  //   };
  //   var keyword = Session.get('search');
  //   var query = new RegExp( keyword, 'i') ;
  //   return Quizes.find({'title': query}, queryOptions);
  // },
});

Template.search.created = function () {
  Session.set('show_right_sidebar', false);
};
