Questions = new Meteor.Collection('questions');

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
    var user = Meteor.user();
      // similarQuestion = Questions.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throwError(401, "You need to log in to post a question");

    // ensure the post has a title
    if (!questionAttributes.title)
      throwError(422, 'Please enter a question');

  	if (!questionAttributes.answer)
  		throwError(422, 'Please provide an answer');

    


    var question = _.extend(_.pick(questionAttributes, 'title', 'answer'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
    });




    var questionId = Questions.insert(question);
    // set the right kind attribute on the question
    Meteor.call('questionKind', questionId);
    console.log('value of kind');


    return questionId;
  },

  checkAnswer: function(answerAttributes){
    console.log('in checkAnswer');
    console.log('this is the answer provided');
    console.log(answerAttributes.answer);
    console.log('this is id of question being answered');
    console.log(answerAttributes.question);
    if (!answerAttributes.answer){
      throwError(422, 'Please provide an answer');
    }
    
    console.log('made it this far');

    var submitted = answerAttributes.answer.toLowerCase();
    submitted = submitted.replace(/,|and|the|of/g, '').trim();

    console.log('submitted');
    console.log(submitted);
    var question = Questions.findOne(answerAttributes.question);
    var correct = question.answer.toLowerCase();
    correct = correct.replace(/,|and|the|of/g, '').trim();
    console.log('correct answer');
    console.log(correct);
    var alsoCorrect;

    if (question.kind == 'number'){
      // can accept spelled out or digits

    }

    if (question.kind == 'boolean'){
      if (question.answer == 'yes'){
        alsoCorrect = ['y', 'true'];
      } else {
        alsoCorrect = ['n', 'false'];
      }
      // 
    }

    if (question.kind == 'suits'){
      // correct = 
    }

    if (alsoCorrect){
      if (_.contains(alsoCorrect, submitted)){
        return true;
      }
    }


    if (submitted !== correct){
      throwError(422, 'Incorrect answer');
    }

    // return question._id;
      // return new Meteor.error(422, 'Incorrect answer');

    // if (submitted == correct){
      // console.log('the correct answer was submitted');

    // } else {
      // console.log('INCORRECT');
      // throw new Meteor.error(422, 'Incorrect answer');
    // }

  },


});




