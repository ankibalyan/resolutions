import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Resolutions } from '../api/resolutions.js';
import './resolution.html';

Template.resolution.events({
	'click .toggle-checked': function () {
		Meteor.call('resolutions.setChecked',this._id, !this.checked);
	},
	'click .delete': function () {
		Meteor.call('resolutions.remove', this._id);
	}
});