Template.errors.helpers({
	errors: function(){
		// return all the errors in the local errors collection
		return Errors.find();
	}

});

Template.error.rendered = function(){
	// 'this' refers to current template instance
	// 'this.data' is the object that is currently being rendered
	var error = this.data;
	Meteor.defer(function(){
		Errors.update(error._id, {$set: {seen:true}});
	});
};