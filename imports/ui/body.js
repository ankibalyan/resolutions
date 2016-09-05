import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Resolutions } from '../api/resolutions.js';

import './resolution.js';
import './body.html';
	
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('resolutions');
});

Template.body.helpers({
	resolutions() {
		const instance = Template.instance();
		if (instance.state.get('hideFinished')) {
			return Resolutions.find({checked: {$ne: true}}, {
				sort: {CreatedAt: -1}
				/*
				sort: Sort specifier,
				skip: Number,
				limit: Number,
				fields: Field specifier,
				reactive: Boolean,
				transform: Function
				*/
			});
		}else{
			return Resolutions.find({},{sort: {CreatedAt: -1}});
		}
	},
	incompleteCount(){
		return Resolutions.find({ checked: { $ne: true } }).count();
	}
});

Template.body.events({
	'submit .new-resolution': function (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
	    const target = event.target;
		const title = target.title.value;
		
		// Insert a task into the collection
    	Meteor.call('resolutions.insert', title);

		event.target.title.value = "";

		return false;
	},
	'change .hide-finished': function (event,instance) {
		instance.state.set('hideFinished',event.target.checked);
	}
});