// Meteor methods that can only be called on the server; have access to answer attribute of question

var cleanAnswer = function(answer){
  // clean user submitted answer and return as array of strings
  var submitted = answer.toLowerCase();
  submitted = submitted.replace(/,|and|the|of/g, '').trim();
  return submitted.split(' ');
};

var isAccepted = function(submitted, correct, question){
  var alsoValid
  ,   suits = ['heart', 'diamond', 'club', 'spade'];

  if (submitted.join() == correct.join()){
    return true;
  }

  if (question.kind == 'boolean'){
    if (_.contains(correct, 'yes') || _.contains(correct, 'true')){
      alsoValid = ['y', 'true'];
    } else {
      alsoValid = ['n', 'false'];
    }

    return _.contains(alsoValid, submitted[0]);
  }

  if (question.kind == 'suits'){
    // need to accept 'heart' for hearts'
    _.each(submitted, function(suit, index){
      if (_.contains(suits, suit)){
        submitted[index] = suit + 's';
      }
    });
    return submitted.join() == correct.join();

  }
};


Meteor.methods({

  questionKind: function(questionId){
    var question = Questions.findOne(questionId)
    ,   answer = question.answer.toLowerCase().replace(/,/g, '')
    ,   suits = ['hearts', 'spades', 'diamonds', 'clubs', 'heart', 'spade', 'diamond', 'club']
    ,   bools = ['yes', 'no']
    ,   kind
    ,   questionProperties;

    if (!isNaN(parseFloat(answer))){
      kind = 'number';
    }

    if (_.contains(bools, answer)){
      kind = 'boolean';
    }

    // determine if there is suit named in the answer
    answer = answer.split(' ');
    if (_.intersection(answer, suits).length){
      kind = 'suits';
    }

    // set the right kind on the question
    questionProperties = {
      kind: kind
    };

    Questions.update(questionId, {$set: questionProperties}, function(error) {
      if (error) {
        // do some error logging 
      }
    });

  },

  question: function(questionAttributes) {
    var user = Meteor.user()
    ,   question
    ,   questionId;

    // ensure the user is logged in
    if (!user){
      throw new Meteor.Error('You need to log in to post a question');
    }

    // ensure there is a question and answer provided
    if (!questionAttributes.title){
      throw new Meteor.Error('Please provide a question');
    }

    if (!questionAttributes.answer){
      throw new Meteor.Error('Please provide an answer');
    }

    question = _.extend(_.pick(questionAttributes, 'title', 'answer', 'explanation', 'url'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
    });

    questionId = Questions.insert(question);
    // figure out the right kind attribute on the question
    Meteor.call('questionKind', questionId);
    return questionId;
  },

  validateAnswer: function(answerAttributes){
   
    var submitted = cleanAnswer(answerAttributes.answer)
    ,   question = Questions.findOne(answerAttributes.question)
    ,   correct = cleanAnswer(question.answer)
    ,   accepted = isAccepted(submitted, correct, question);

    if (!accepted){
      throw new Meteor.Error('Incorrect answer');
    }

  },

  getAnswer: function(questionId){
    // return full question for template 
    var question = Questions.findOne(questionId);
    return question.answer;
  },

});




