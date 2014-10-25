Template.account.helpers({
	questions: function(){
		return Questions.find({userId: this._id});
	}
});