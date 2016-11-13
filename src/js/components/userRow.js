import React from "react"
import { connect } from "react-redux"

@connect( ( store, props ) => {
	let totals = store.users.totals;
	let reviewRequestsCount = 0;
	let reviewsCount = 0;

	if ( totals[ props.user.username ] && totals[ props.user.username ][ props.group ].reviewRequests ) {
		let reviewRequests = totals[ props.user.username ][ props.group ].reviewRequests;

		for ( let reviewRequestId of Object.keys( reviewRequests ) ) {
			if ( reviewRequests[ reviewRequestId ].withinLimit ) {
				reviewRequestsCount++;
			}
		}
	}

	if ( totals[ props.user.username ] && totals[ props.user.username ][ props.group ].reviews ) {
		let reviews = totals[ props.user.username ][ props.group ].reviews;

		for ( let reviewId of Object.keys( reviews ) ) {
			if ( reviews[ reviewId ].withinLimit ) {
				reviewsCount++;
			}
		}
	}

	return {
		reviewRequestsCount: reviewRequestsCount,
		reviewsCount: reviewsCount,
		...props
	}
} )
export default class UserRow extends React.Component {

	render() {
		return (
			<tr>
				<td>{this.props.ranking}</td>
				<td>{this.props.user.username}</td>
				<td>{this.props.reviewsCount}</td>
				<td>{this.props.reviewRequestsCount}</td>
			</tr>
		);
	}
}