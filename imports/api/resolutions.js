import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('resolutions', function resolutionsPublication() {
    return Resolutions.find();
  });
}

Meteor.methods({
	'resolutions.insert'(title){
		check(title, String);

		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Resolutions.insert({
			title,
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
			createdAt: new Date(),
		});
	},
	'resolutions.remove'(resolutionId){
		check(resolutionId, String);

		Resolutions.remove(resolutionId);
	},
	'resolutions.setChecked'(resolutionId, setChecked){
		check(resolutionId, String);
    	check(setChecked, Boolean);
		Resolutions.update(resolutionId,{$set: {checked: setChecked}});
	}
});