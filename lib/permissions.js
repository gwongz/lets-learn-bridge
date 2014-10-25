ownsDocument = function(userId, doc){
	return doc && doc.userId == userId;
};

isSuperuser = function(userId){
	if (!userId){
		return false;
	}
	return Meteor.users.findOne(userId).profile.superuser;
};

canViewAccount = function(userId){
	return Meteor.userId() == userId || isSuperuser(Meteor.userId());
};