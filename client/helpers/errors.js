Errors = new Meteor.Collection(null);

throwError = function(message){
	console.log('throwing an error');
    Errors.insert({message: message, seen: false});


};

// once an error has been displayed to user, remove it from the collection
clearErrors = function(){
    Errors.remove({seen: true});
};