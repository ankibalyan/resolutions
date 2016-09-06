import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Resolutions } from '../api/resolutions.js';
import './resolution.html';

Template.resolution.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.resolution.events({
	'click .toggle-checked': function () {
		Meteor.call('resolutions.setChecked',this._id, !this.checked);
	},
	'click .delete': function () {
		Meteor.call('resolutions.remove', this._id);
	},
	'click .toggle-private': function() {
		Meteor.call('resolutions.setPrivate',this._id, !this.private);
	}
});