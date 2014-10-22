Template.questionRandom.rendered = function() {
   console.log('questionRandom on load');
   var randomId = getRandom();
   Router.go('questionPage', {_id: randomId});
};
