Template.incorrectAnswer.events({
	'click .hint': function(){

    Meteor.call('getAnswer', this._id, function(err, response){
      console.log('this is value of answer');
      console.log(response);
      Session.set('answer', response);
      // return response;
    });

    Meteor.call('getExplanation', this._id, function(err, response){
      Session.set('explanation', response);
    });

	$('.revealed-answer').removeClass('hidden');

	}
});

Template.incorrectAnswer.helpers({
	answer: function(){
		return Session.get('answer');
	},

	explanation: function(){
		return Session.get('explanation');
	}
});

Template.incorrectAnswer.rendered=function(){


};