import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Requests } from '../api/requests.js';


// also import Request.jsx
import Request from './Request.jsx';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';
//App Component - represents the whole App
class App2 extends Component{

	constructor(props){
		super(props);
		this.state = {
			hideCompleted : false,
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		//Find the text field via the React ref
		const  text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
		//--------changed from tasks to small requests----------//
		Meteor.call('requests.insert',text);


		//clear form
		ReactDOM.findDOMNode(this.refs.textInput).value= '';
	}

	toggleHideCompleted(){
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		});
	}
	//--------changed from renderTasks to renderRequests----------//

	renderRequests(){
		//--------changed from tasks to small requests and from filteredTasks to filteredRequests----------//
		let filteredRequests  = this.props.requests;
		if( this.state.hideCompleted){
		//--------changed filteredTasks to filteredRequests twice + from task to request twice----------//
			filteredRequests = filteredRequests.filter(request => !request.checked);
		}
		//--------changed filteredTasks to filteredRequests  + from task to request ----------//
		return filteredRequests.map((request) => {
			const currentUserId = this.props.currentUser && this.props.currentUser._id;
			//--------changed from task to request ----------//
			const showPrivateButton = request.owner === currentUserId;
			console.log("currentUserId", currentUserId);
			return (
				//--------Task to Request  + from task to request twice ----------//
				<Request
					key={request._id}
					request= {request}
					showPrivateButton = {showPrivateButton}
				/>
			);
		});
	}

	render(){
		return(

			<div className="container">

			<header>
	        	<h1>Request List {this.props.incompleteCount}</h1>

	        	<label className= "hide-completed">
	        		<input
	        			type ="checkbox"
	        			readOnly
	        			checked={this.state.hideCompleted}
	        			onClick={this.toggleHideCompleted.bind(this)}
	        		/>
	        		Hide Completed Requests
	        	</label>

	        	<AccountsUIWrapper  />
	        	{this.props.currentUser ?
	        	<form className="new-task" onSubmit = {this.handleSubmit.bind(this)} >
	        		<input
	        			type="text"
	        			ref="textInput"
	        			placeholder = "Type to add new request"
	        		/>
	        	</form> :''
	        	}
	        </header>

			<ul>
	        	{this.renderRequests()}
	        </ul>

	      </div>
		);
	}

}
App2.propTypes = {


	requests: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object,
};


export default createContainer(() => {
	Meteor.subscribe('requests-publication-name');
	
  return {
     requests: Requests.find({}, { sort: { createdAt: -1 } }).fetch(),
     incompleteCount: Requests.find({ checked:{$ne:true} }).count(),
     currentUser: Meteor.user(),

  };

}, App2);