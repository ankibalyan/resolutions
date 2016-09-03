import { Template } from 'meteor/templating';
import { Resolutions } from '../api/resolutions.js';
import './body.html';
Template.body.helpers({
	resolutions: function() {
		return Resolutions.find();
	}
});

Template.body.events({
	'submit .new-resolution': function (event) {
		var title = event.target.title.value;
		
		Resolutions.insert({
			title: title,
			createdAt: new Date()
		});

		event.target.title.value = "";

		return false;
	}
});