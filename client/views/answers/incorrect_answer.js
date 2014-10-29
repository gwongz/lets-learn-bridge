


Template.incorrectAnswer.events({
	'click .hint': function(){

    Meteor.call('getAnswer', this._id, function(err, response){
      console.log('this is value of answer');
      console.log(response);
      Session.set('answer', response);
      // return response;
    });

	$('.revealed-answer').removeClass('hidden');

	}
});

Template.incorrectAnswer.helpers({
	answer: function(){
		return Session.get('answer');
	},
});

Template.incorrectAnswer.rendered=function(){


};