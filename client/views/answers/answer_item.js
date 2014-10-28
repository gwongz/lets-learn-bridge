Template.answerItem.events({

  'submit form.answer': function(e) {
    e.preventDefault();
    clearErrors();

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
        $('.incorrect').removeClass('hidden');
        $('.correct').addClass('hidden');
      } else {
        $('.correct').removeClass('hidden');
        $('.incorrect').addClass('hidden');

        Meteor.call('getExplanation', this._id, function(err, response){
          Session.set('explanation', response);
        });
        
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
    // clearAnswer happens onBeforeAction of questionPage
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