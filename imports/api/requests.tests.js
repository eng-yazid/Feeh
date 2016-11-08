/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { Requests } from './requests.js';

if (Meteor.isServer) {
  describe('Requests', () => {
    describe('methods', () => {
      const userId = Random.id();
      let requestId;

      beforeEach(() => {
        Requests.remove({});
        requestId = Tasks.insert({
          text: 'test request',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      it('can delete owned request', () => {
      });
    });
  });
}