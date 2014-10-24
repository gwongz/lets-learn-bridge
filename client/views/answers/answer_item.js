getRandom = function(currentId) {
    // make sure next question is not the same as one just completed
    
    var alreadyAnswered = CorrectAnswers.find({}, {fields: {question_id: 1}}).fetch()
    ,   answeredIds = _.flatten(_.pluck(alreadyAnswered, 'question_id'), true)
    ,   questions = Questions.find({}, {fields: {_id: 1}}).fetch()
    ,   questionIds = _.flatten(_.pluck(questions, '_id'), true)
    ,   eligibleIds = _.difference(questionIds, answeredIds, [currentId])
    ,   randomId;
    // console.log('these are already answered');
    // already_ids = _.flatten(_.pluck(alreadyAnswered, 'question_id'), true);
    // console.log(already_ids);
    // var questions = Questions.find({}, {fields: {_id: 1}}).fetch();
    // var question_ids = _.flatten(_.pluck(questions, '_id'), true);

    // eligible_ids = _.difference(question_ids, already_ids, [currentId]);

    if (!eligibleIds.length){
      // user has answered all the questions
      if (_.contains(answeredIds, currentId)){
        Router.go('allAnswered');
      } else {
        console.log('user has answered all of the questions but one');
      // user has answered all of the questions but skipped the last one
        return currentId;
      }
    }
    randomId = eligibleIds[Math.floor(Math.random() * eligibleIds.length)];
    return randomId;
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

    console.log('submitting answer');
    Meteor.call('validateAnswer', answerAttributes, function(error){
      if (error){
        console.log('there was an error');
        $('.incorrect').removeClass('hidden');
        $('.correct').addClass('hidden');
      } else {
        console.log('no error was thrown by checkanswer');
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
});