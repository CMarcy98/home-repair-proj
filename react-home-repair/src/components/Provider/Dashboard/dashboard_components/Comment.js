import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'];

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: {}
		}
	}

	componentDidMount() {
		// console.log('Timestamp:'. this.props.comment);
		axios.get(`http://localhost:8000/providers/${this.props.comment.author}`)
			.then(res => {
				if(res.data.provider !== null) {
					this.setState({
						author: res.data.provider
					});
				} else {
					axios.get(`http://localhost:8000/users/${this.props.comment.author}`)
						.then(result => {
							this.setState({
								author: result.data.user
							});
						})
						.catch(error => {
							console.log('Error:', error);
						});
				}
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
		const date = new Date(comment.timestamp);
		const month = months[date.getMonth()];
		const day = date.getDate();
		const year = date.getFullYear();
		const hours = date.getHours();
		const min = date.getMinutes();
		const ampm = (hours > 11) ? 'pm' : 'am';

		const formattedDate = `${month} ${day}, ${year}  ${(hours > 12 ) ? hours % 12 : hours}:${min} ${ampm}`;

		return (
			<div style={style}>
				<div style={{width: '10%', marginLeft: '10px'}}>
					<FontAwesomeIcon style={{height: '35px', width: '35px'}} icon="user-circle"/>
				</div>
				<div style={{marginLeft: '10px'}}>
					<div style={{fontSize: '14px', display: 'flex'}}>
						<div>{this.state.author.firstName} {this.state.author.lastName}</div>
					</div>
					<div style={{fontSize: '12px'}}>{comment.content}</div>
					<div style={{fontSize: '12px'}}><em>{formattedDate}</em></div>
				</div>
			</div>
		);

	}
}
