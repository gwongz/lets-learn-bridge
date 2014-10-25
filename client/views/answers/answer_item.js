Template.answerItem.events({

  'submit form.answer': function(e) {
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