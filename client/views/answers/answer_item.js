getRandom = function() {
    var alreadyAnswered = CorrectAnswers.find({}, {fields: {question_id: 1}}).fetch();
    console.log('these are already answered');
    already_ids = _.flatten(_.pluck(alreadyAnswered, 'question_id'), true);
    console.log(already_ids);
    var questions = Questions.find({}, {fields: {_id: 1}}).fetch();
    var question_ids = _.flatten(_.pluck(questions, '_id'), true);

    eligible_ids = _.difference(question_ids, already_ids);
    console.log('the eligible ids');
    console.log(eligible_ids); 
    var random_id = eligible_ids[Math.floor(Math.random() * eligible_ids.length)];
    console.log('these are the eligible ids');
    console.log(eligible_ids);
    if (!eligible_ids.length){
      console.log('user has answered all of the questions');
      Router.go('allAnswered');
    }

    // var random_id = question_ids[Math.floor(Math.random() * question_ids.length)];
    console.log('these are the question ids');
    // console.log(question_ids);
    console.log('a random_id');
    console.log(random_id);
    return random_id;
};

clearAnswer = function(){
  $('input[name=answer]').val('');
  $('.correct, .incorrect').addClass('hidden');
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
        var randomId = getRandom();
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