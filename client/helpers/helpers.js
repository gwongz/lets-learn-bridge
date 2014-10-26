// global functions used in client views
getRandom = function(currentId) {
    // make sure next question is not the same as one just completed
    
    var alreadyAnswered = CorrectAnswers.find({}, {fields: {question_id: 1}}).fetch()
    ,   answeredIds = _.flatten(_.pluck(alreadyAnswered, 'question_id'), true)
    ,   questions = Questions.find({}, {fields: {_id: 1}}).fetch()
    ,   questionIds = _.flatten(_.pluck(questions, '_id'), true)
    ,   eligibleIds = _.difference(questionIds, answeredIds, [currentId])
    ,   randomId;

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
  console.log('clear answer is happening on page redirect');
  // set questionPage template back to default 
  $('input[name=answer]').val('');
  $('.correct, .incorrect').addClass('hidden');
  $('.revealed-answer').addClass('hidden');
  Session.set('answer', null);
  Session.set('explanation', null);
};

