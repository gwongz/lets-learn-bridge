// template helpers that can be used from all templates
Template.registerHelper('canEdit', function(){
	var currentUser = Meteor.userId();
	return ownsDocument(currentUser, this) || isSuperuser(currentUser);
});

Template.registerHelper('timeOfDay', function(){
	var hours = new Date().getHours();
	if (hours > 18){
		return 'evening';
	} else if (hours >= 12){
		return 'afternoon';
	} else {
		return 'morning';
	}
});

Template.registerHelper('isSuperuser', function(){
	var currentUser = Meteor.userId();
	return isSuperuser(currentUser);
});


