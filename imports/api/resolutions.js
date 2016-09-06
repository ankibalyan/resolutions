import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish resolutions that are public or belong to the current user
  Meteor.publish('resolutions', function resolutionsPublication() {
    return Resolutions.find({
    	$or: [
    		{private: {$ne: true}},
    		{owner: this.userId}
    	]
    });
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
		const resolution = Resolutions.findOne(resolutionId);

		if (resolution.owner !== this.userId) {
			// If the resolution is private, make sure only the owner can delete it
			throw new Meteor.Error('not-authorized');
		}
		
		Resolutions.remove(resolutionId);
	},
	'resolutions.setChecked'(resolutionId, setChecked){
		check(resolutionId, String);
    	check(setChecked, Boolean);
		
		const resolution = Resolutions.findOne(resolutionId);

		if (resolution.private && resolution.owner !== this.userId) {
			// If the resolution is private, make sure only the owner can delete it
			throw new Meteor.Error('not-authorized');
		}

		Resolutions.update(resolutionId,{$set: {checked: setChecked}});
	},
	'resolutions.setPrivate'(resolutionId, setPrivate){
		check(resolutionId, String);
		check(setPrivate, Boolean);

		Resolutions.update(resolutionId, {$set: {private: setPrivate}});
	}
});