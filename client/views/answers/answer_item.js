getRandom = function() {
    var questions = Questions.find({}, {fields: {_id: 1}}).fetch();
    var question_ids = _.flatten(_.pluck(questions, '_id'), true);
    var random_id = question_ids[Math.floor(Math.random() * question_ids.length)];
    console.log('these are the question ids');
    console.log(question_ids);
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

    var question = Session.get('selected_question');
    var answerAttributes = {
        answer: $(e.target).find('[name=answer]').val(),
        question: question._id
    };
      // message: $(e.target).find('[name=message]').val()

    
    console.log('this is the title of question');
    console.log(question.title);
    console.log('this is the answer');
    console.log(question.answer);
    console.log('question id');
    console.log(question._id);

    console.log(answerAttributes.answer == question.answer);


    Meteor.call('checkAnswer', answerAttributes, function(error){
      if (error){
        $('.incorrect').removeClass('hidden');
        $('.correct').addClass('hidden');
        // alert(error.reason);
        // Router.go('answerPage');
      } else {
        $('.correct').removeClass('hidden');
        $('.incorrect').addClass('hidden');
        var randomId = getRandom();
        setTimeout(function(){
          clearAnswer();
          Router.go('questionPage', {_id: randomId});

        }, 2000);
        

        // Router.go('questionPage', {_id: 'SNE7PhkKst5Zy6AgP'});
      }
        
    });

  },

  'keypress input': function(e){
    console.log('on keypress');
    if (e.which == 13) {
        e.preventDefault();
        $('form').submit();
    }
  },

});

Template.answerItem.helpers({
  selected_question: function() {
    // var randomQuestion = Questions.findOne();
    return Session.get('selected_question');
    // return randomQuestion;
  },

  num_check: function(){
    if (Session.get('selected_question')){
      var question = Session.get('selected_question');
      if (question.kind == 'number'){
        return 'Enter digits';
      } else {
        return '';
      }
    }


  },
});