getRandom = function(currentId) {
    // make sure next question is not the same as one just completed
    var alreadyAnswered = CorrectAnswers.find({}, {fields: {question_id: 1}}).fetch();
    console.log('these are already answered');
    already_ids = _.flatten(_.pluck(alreadyAnswered, 'question_id'), true);
    console.log(already_ids);
    var questions = Questions.find({}, {fields: {_id: 1}}).fetch();
    var question_ids = _.flatten(_.pluck(questions, '_id'), true);

    eligible_ids = _.difference(question_ids, already_ids, [currentId]);

    if (!eligible_ids.length){
      console.log('user has answered all of the questions');
      Router.go('allAnswered');
    }
    var random_id = eligible_ids[Math.floor(Math.random() * eligible_ids.length)];
    console.log('these are the eligible ids');
    console.log(eligible_ids);
    return random_id;
};

clearAnswer = function(){
  // set questionPage template back to default 
  $('input[name=answer]').val('');
  $('.correct, .incorrect').addClass('hidden');
  $('.revealed-answer').addClass('hidden');
};

Template.answerItem.events({

  'submit form': function(e) {
    e.preventDefault();

    // var question = Session.get('selected_question');
    var answerAttributes = {
        answer: $(e.target).find('[name=answer]').val(),
        question: this._id
    };

    


    Meteor.call('checkAnswer', answerAttributes, function(error){
      if (error){
        $('.incorrect').removeClass('hidden');
        $('.correct').addClass('hidden');
      } else {
        $('.correct').removeClass('hidden');
        $('.incorrect').addClass('hidden');
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
    console.log('skip button was clicked');
    var randomId = getRandom(this._id);
    Router.go('questionPage', {_id: randomId});

  },

});

Template.answerItem.helpers({

  num_check: function(){
      console.log('what is value of this in answerItem');
      console.log(this._id);

      if (this.kind == 'number'){
        return 'Enter digits';
      } else {
        return '';
      }

  },
});