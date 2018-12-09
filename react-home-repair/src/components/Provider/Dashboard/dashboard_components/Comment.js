import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: {}
		}
	}

	componentDidMount() {
		console.log('Calling the api for user information');
		axios.get(`http://localhost:8000/providers/${this.props.comment.author}`)
			.then(res => {
				this.setState({
					author: res.data.provider
				});
			})
			.catch( err => {
				console.log('Error:', err);
			});
	}

	render() {
		const isEven = this.props.index % 2 === 0;
		const style = {
			paddingTop:'10px',
			paddingBottom:'10px',
			display: 'flex',
			backgroundColor: isEven ? '#E8E8E8' : 'white',
			borderRadius: isEven ? '7px' : '0px'
		}

		const comment = this.props.comment;
		// const author = this.state.author;
		// Testing
		// If the author's name does not equal undefined, set it to the first name other wise set it to ''
		// let authorName;
		// if(this.state.author.firstName) {
		// 	authorName = this.state.author.firstName;
		// } else {
		// 	authorName = '';
		// }
		// console.log('New author name:', authorName);
		// const name = this.state.author.firstName ? `${this.state.author.firstName} ${this.state.author.lastName}` : '';

		return (
			<div style={style}>
				<div style={{width: '10%', marginLeft: '10px'}}>
					<FontAwesomeIcon style={{height: '35px', width: '35px'}} icon="user-circle"/>
				</div>
				<div style={{marginLeft: '10px'}}>
					<div style={{fontSize: '14px'}}>{'hello'}</div>
					<div style={{fontSize: '12px'}}>{comment.content}</div>
				</div>
			</div>
		);

	}
}
