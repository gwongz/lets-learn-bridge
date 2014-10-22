// keep track of which questions player has already answered correctly
CorrectAnswers = new Meteor.Collection(null);

logAnswer = function(id){
	console.log('adding questionId to correct answeres collection');
    CorrectAnswers.insert({question_id: id});
};

