Template.questionItem.helpers({
	ownQuestion: function(){
		var currentUser = Meteor.userId();
		return ownsDocument(currentUser, this);
	}


});
