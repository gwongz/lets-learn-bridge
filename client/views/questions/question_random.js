Template.questionRandom.rendered = function() {
  var randomId = getRandom();
  Router.go('questionPage', {_id: randomId});
};
