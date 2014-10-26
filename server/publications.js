Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish('userData', function () {
	// only publish data for all users if logged in user is superuser
	if (isSuperuser(this.userId)){
		return Meteor.users.find({}, {fields: {'_id':1, 'username': 1}});
	}
});
