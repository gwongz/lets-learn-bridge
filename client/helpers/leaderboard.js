// keep track of which questions player has already answered correctly
CorrectAnswers = new Meteor.Collection(null);

logAnswer = function(id){
    CorrectAnswers.insert({question_id: id});
};