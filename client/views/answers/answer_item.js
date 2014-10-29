var clearAnswer = function(){
  // set questionPage template back to default 
  $('input[name=answer]').val('');
  $('.revealed-answer').addClass('hidden');
  Session.set('answer', null);
  Session.set('answerStatus', null);
};

Template.answerItem.events({

  'submit form.answer': function(e) {
    e.preventDefault();
    clearErrors();
    Session.set('answerStatus', null);

    var submission = $(e.target).find('[name=answer]').val();

    var answerAttributes = {
        answer: submission,
        question: this._id
    };

    if (!submission){
      return throwError('Please submit an answer or skip the question');
    }

    Meteor.call('validateAnswer', answerAttributes, function(error){
      if (error){
        Session.set('answerStatus', 'incorrect');
      } else {
        Session.set('answerStatus', 'correct');
        logAnswer(answerAttributes.question);
        var randomId = getRandom(answerAttributes.question);
        setTimeout(function(){
          clearAnswer();
          Router.go('questionPage', {_id: randomId});
        }, 2000);
      }
            
    });

  },

  'keypress input': function(e){
    if (e.which == 13) {
        e.preventDefault();
        $('form').submit();
    }
  },

  'click .skip-question': function(){
    var randomId = getRandom(this._id);
    clearAnswer();
    Router.go('questionPage', {_id: randomId});
  },

});

Template.answerItem.helpers({

  is_num: function(){
      if (this.kind == 'number'){
        return 'Enter digits';
      } else {
        return '';
      }

  },

  answerStatus: function(){
    if (Session.get('answerStatus') === 'incorrect'){
      return 'incorrectAnswer';
    } else if (Session.get('answerStatus') === 'correct'){
      return 'correctAnswer';
    } else {
      return;
    }
  },

});