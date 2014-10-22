Template.questionItem.helpers({



  question: function() {
  	var randomId = getRandom();
  	console.log('this is the randomId returned');
  	console.log(randomId);
  	var randomQuestion = Questions.findOne(randomId);
  	Session.set('selected_question', randomQuestion);
 		console.log('this is the question text');
 		console.log(randomQuestion.title); 
 		return randomQuestion;
  	
  }
});