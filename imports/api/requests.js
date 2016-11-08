import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {check} from 'meteor/check';

export const Requests = new Mongo.Collection('requests');

if(Meteor.isServer){
	//this code only runs on the server
	// Only publish tasks that are public or belong to the current user
	Meteor.publish('requests-publication-name',function requestsPublication(){
	    return Requests.find({ 
	    	$or: [ 
	    	 { private: { $ne: true } },
	    	 { owner: this.userId }, 
	    	],
	    });

	});
}

Meteor.methods({
	'requests.insert'(text){
		//make sure the user is logged in before inserting a task
		if(!this.userId){
			throw new Meteor.Error('not-authorized');

		}
		Requests.insert({
			text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});

	},

	'requests.remove'(requestId){
		check(requestId, String);
		const request = Requests.findOne(requestId);
		if(request.private && request.owner !== this.userId){
			throw new Meteor.Error('not-authorized');
		}
		Requests.remove(requestId);
	},

	'requests.setChecked'(requestId, setChecked){
		check(requestId, String);
		check(setChecked,Boolean);

		const request = Requests.findOne(requestId);
		if(request.private && request.owner !== this.userId){
			throw new Meteor.Error('not-authorized');
		}
		Requests.update(requestId, {$set: {checked: setChecked} });
	},

	'requests.setPrivate'(requestId,setToPrivate){
	
		check(requestId,String);
		check(setToPrivate, Boolean);

		const request = Requests.findOne(requestId);
		//make sure the only task owner can make a task private
		if(request.owner !== this.userId){
			throw new Meteor.Error('not-authorized');
		}

		Requests.update(requestId, {$set: {private: setToPrivate} });

	},

});