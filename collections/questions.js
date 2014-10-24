Questions = new Meteor.Collection('questions');

Questions.allow({
    update: ownsDocument,
    remove: ownsDocument
});

var cleanAnswer = function(answer){
  // clean user submitted answer and return as array of strings
  var submitted = answer.toLowerCase();
  submitted = submitted.replace(/,|and|the|of/g, '').trim();
  return submitted.split(' ');
};

var isAccepted = function(submitted, correct, question){
  var alsoAccepted;
  if (_.isEmpty(_.difference(submitted, correct))){
    return true;
  }

  if (question.kind == 'boolean'){
    if (_.contains(correct, 'yes') || _.contains(correct, 'true')){
      alsoAccepted = ['y', 'true'];
    } else {
      alsoAccepted = ['n', 'false'];
    }

    return _.contains(alsoAccepted, submitted[0]);
  }

  if (question.kind == 'suits'){
    // need to accept 'heart for hearts'
    var suits = ['heart', 'diamond', 'club', 'spade'];
    console.log('submitted before turning plural');
    console.log(submitted)
    _.each(submitted, function(suit, index){
      console.log(index);
      if (_.contains(suits, suit)){
        submitted[index] = suit + 's';
        suit = suit + 's';
        console.log(suit)
      }
    });
    console.log('submitted after loop');
    console.log(submitted);

  }


};


Meteor.methods({

  questionKind: function(questionId){
    var question = Questions.findOne(questionId);
    var answer = question.answer.toLowerCase().replace(/,/g, '');
    var kind;
    var bools = ['yes', 'no'];
    var suits = ['hearts', 'spades', 'diamonds', 'clubs', 'heart', 'spade', 'diamond', 'club'];

    if (!isNaN(parseFloat(answer))){
      kind = 'number';
    }

    if (_.contains(bools, answer)){
      kind = 'boolean';
    }

    answer = answer.split(' ');

    var intersection = _.intersection(answer, suits);
    console.log('is there an intersection?');
    console.log(intersection.length);
    if (intersection.length){
      kind = 'suits';
    }


    var questionProperties = {
      kind: kind
    };

    Questions.update(questionId, {$set: questionProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      }
    });

  },

  question: function(questionAttributes) {
    var user = Meteor.user()
    ,   question
    ,   questionId;

    // ensure the user is logged in
    if (!user)
      throwError(401, 'You need to log in to post a question');

    // ensure there is a question and answer provided
    if (!questionAttributes.title)
      throwError(422, 'Please enter a question');

    if (!questionAttributes.answer)
      throwError(422, 'Please provide an answer');

    question = _.extend(_.pick(questionAttributes, 'title', 'answer', 'explanation'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
    });

    questionId = Questions.insert(question);
    // set the right kind attribute on the question
    Meteor.call('questionKind', questionId);
    return questionId;
  },

  checkAnswer: function(answerAttributes){
    if (!answerAttributes.answer){
      throwError(422, 'Please provide an answer');
    }

    var submitted = cleanAnswer(answerAttributes.answer)
    ,   question = Questions.findOne(answerAttributes.question)
    ,   correct = cleanAnswer(question.answer)
    ,   accepted = isAccepted(submitted, correct, question);

    if (!accepted){
      throwError(422, 'Incorrect answer');
    }


  },


});




