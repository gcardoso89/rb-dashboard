import React from "react"
import { connect } from "react-redux"

import { fetchReviewsByGroup, getReviews } from "../actions/reviews"
import { getUsersGroup, updateUserReviews, updateUserReviewRequests } from "../actions/users"

import Groups from "./Groups";

@connect( ( store ) => {
	return {
		reviews: store.reviews,
		reviewRequests: store.reviewRequests,
		groups: store.groups
	}
} )
export default class Layout extends React.Component {
	
	componentWillMount() {
		this.props.groups.forEach( ( groupName ) => {
			this.props.dispatch( getUsersGroup( groupName, ( groupName ) => {
				this.props.dispatch( fetchReviewsByGroup( groupName, ( reviewRequest ) => {
					this.props.dispatch( updateUserReviewRequests( reviewRequest ) );
					this.props.dispatch( getReviews( reviewRequest, groupName, ( review, groupName ) => {
						this.props.dispatch( updateUserReviews( review, groupName ) );
					} ) );
				} ) );
			} ) );
		} );
	}

	render() {
		return <Groups />;
	}
}