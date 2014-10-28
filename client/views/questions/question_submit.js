Template.questionSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    // clear any client side errors that may have been thrown by earlier submission
    clearErrors();

    var question = {
      answer: $(e.target).find('[name=answer]').val(),
      title: $(e.target).find('[name=title]').val(),
      explanation: $(e.target).find('[name=explanation]').val()
    };

    Meteor.call('question', question, function(error, id) {
      if (error)
        throwError(error.error);
      else
        Router.go('questionPage', {_id: id});
    });


  }
});

