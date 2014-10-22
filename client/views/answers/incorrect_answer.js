Template.incorrectAnswer.events({
	'click .hint': function(){
		console.log('reveal answer was clicked');
		$('.revealed-answer').removeClass('hidden');
		// show the answer in the incorrect div 

	}
});