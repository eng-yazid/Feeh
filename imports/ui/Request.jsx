
import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

// request component - represents a single todo item

export default class Request extends Component {

	toggleChecked(){
		// set the checked property to the opposite of its current value
		//------------------------- client side methods -----------------------------//
		// Tasks.update(this.props.task._id, {
		// 	$set: {checked: !this.props.task.checked},

		// });
		//------------------------- client side methods -----------------------------//
		Meteor.call('requests.setChecked', this.props.request._id, !this.props.request.checked);
	}

	deleteThisRequest(){
		//------------------------- client side methods -----------------------------//
		// Tasks.remove(this.props.task._id);
		//------------------------- client side methods -----------------------------//
		Meteor.call('requests.remove',this.props.request._id);
	}

	togglePrivate() {

    Meteor.call('requests.setPrivate', this.props.request._id, ! this.props.request.private);


	}

  render() {

  	//Give tasks a different className when they are checked off
  	//so that we can style them nicely in CSS
  	// const taskClassName = this.props.task.checked ? 'checked' : '';

  	const requestClassName = classnames({
  		checked: this.props.request.checked,
  		private: this.props.request.private,
  	});
    
    return (

      <li className={requestClassName}>
      	<button className="delete" onClick = {this.deleteThisRequest.bind(this)}>
     	
			&times;
		</button>

		<input
			type= "checkbox"
			readOnly
			checked = {this.props.request.checked}
			onClick={this.toggleChecked.bind(this)}
		/>


        { this.props.showPrivateButton ? (

          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>

            { this.props.request.private ? 'Private' : 'Public' }
            
          </button>

        ) : 'null'}

	{/* <span className="text"> {this.props.request.text} </span> */}
		<span className="text">
			<strong>{this.props.request.username}</strong> : {this.props.request.text}
		</span>
      </li>

    );

  }

}

 

Request.propTypes = {

  // This component gets the task to display through a React prop.

  // We can use propTypes to indicate it is required

  request: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};

