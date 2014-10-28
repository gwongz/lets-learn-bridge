Meteor.publish('questions', function() {
	// return Questions.find();
	return Questions.find({}, {fields: {'answer': 0}}); // only publish to client without answer 
  // return Questions.find({}, {fields: {'title': 1, 'submitted': 1, 'author': 1, 'kind':1}});
});

// Meteor.publish('allQuestions', function(){
	// return Questions.find({});
// });

Meteor.publish('userData', function () {
	// only publish data for all users if logged in user is superuser
	if (isSuperuser(this.userId)){
		return Meteor.users.find({}, {fields: {'_id':1, 'username': 1}});
	}
});
