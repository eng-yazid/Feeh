

import React from 'react';

import { Meteor } from 'meteor/meteor';

import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

//add import App2 
import App2 from '../imports/ui/App2.jsx';
 

Meteor.startup(() => {

  render(<App2 />, document.getElementById('render-target'));

});