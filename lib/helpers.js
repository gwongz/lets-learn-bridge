// Server and client functions that can be used throughout
Errors = new Meteor.Collection(null);

throwError = function(code, message){
	console.log('throwing an error with this message');
	console.log(message);
    Errors.insert({message: message, seen: false});


};

// once an error has been displayed to user, remove it from the collection
clearErrors = function(){
    Errors.remove({seen: true});
};

// keep track of which questions player has already answered correctly
CorrectAnswers = new Meteor.Collection(null);

logAnswer = function(id){
	console.log('adding questionId to correct answeres collection');
    CorrectAnswers.insert({question_id: id});
};