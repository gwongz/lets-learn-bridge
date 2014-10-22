Template.correctAnswer.helpers({
	question: function(){
		return Questions.findOne(Session.get('selected_question'));
	}
});