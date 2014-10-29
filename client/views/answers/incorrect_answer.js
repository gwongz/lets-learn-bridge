Template.incorrectAnswer.events({
  'click .hint': function(){

    Meteor.call('getAnswer', this._id, function(err, response){
      Session.set('answer', response);
    });

  $('.revealed-answer').removeClass('hidden');

  }
});

Template.incorrectAnswer.helpers({
  // not great to use the Session here - maybe replace with reactive dict?
  answer: function(){
    return Session.get('answer');
  },
});


