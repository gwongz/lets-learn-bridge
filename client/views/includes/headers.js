Template.header.events({
	'click .reshuffle': function(){
		// clear the correct answers collection to restart 
		CorrectAnswers.remove({});
	},
});