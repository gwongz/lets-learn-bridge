Template.errors.helpers({
	errors: function(){
		// return all the errors in the local errors collection
		return Errors.find();
	}

});

Template.error.rendered = function(){
	
	// 'this.data' is the object that is currently being rendered
	var error = this.data;
	// make sure error is 'seen' even when there is page redirect after throwing it
	Meteor.defer(function(){
		Errors.update(error._id, {$set: {seen:true}});
	});
};
