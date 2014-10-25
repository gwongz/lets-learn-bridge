Meteor.publish('questions', function() {
  return Questions.find();
});

Meteor.publish('userData', function () {
	// only publish all userData if user is superuser
	if (isSuperuser(this.userId)){
		return Meteor.users.find({}, {fields: {'_id':1, 'username': 1}});
	}
});
