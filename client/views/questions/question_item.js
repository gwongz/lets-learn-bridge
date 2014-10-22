Template.questionItem.helpers({
	ownQuestion: function(){
		var currentUser = Meteor.userId();
		console.log('value of ownsDoc');
		console.log(ownsDocument(currentUser, this));
		return ownsDocument(currentUser, this);
	}


});
