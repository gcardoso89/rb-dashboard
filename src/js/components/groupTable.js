import React from "react"
import { connect } from "react-redux"

import UserRow from "./userRow";

@connect( ( store, props ) => {
	let reviewRequests = store.reviewRequests[ props.name ] || [];
	let users = store.users.usersGroup[ props.name ] ? store.users.usersGroup[ props.name ].slice( 0 ) : [];

	users.sort( function ( userA, userB ) {

		let totalUserA = store.users.totals[ userA.username ][ props.name ];
		let totalUserB = store.users.totals[ userB.username ][ props.name ];
		let reviewsUserACount = 0;
		let reviewsUserBCount = 0;
		let reviewRequestsUserACount = 0;
		let reviewRequestsUserBCount = 0;

		for ( let reviewId of Object.keys( totalUserA.reviews ) ) {
			if ( totalUserA.reviews[ reviewId ].withinLimit ) {
				reviewsUserACount++;
			}
		}

		for ( let reviewId of Object.keys( totalUserB.reviews ) ) {
			if ( totalUserB.reviews[ reviewId ].withinLimit ) {
				reviewsUserBCount++;
			}
		}


		for ( let reviewRequestId of Object.keys( totalUserA.reviewRequests ) ) {
			if ( totalUserA.reviewRequests[ reviewRequestId ].withinLimit ) {
				reviewRequestsUserACount++;
			}
		}

		for ( let reviewRequestId of Object.keys( totalUserB.reviewRequests ) ) {
			if ( totalUserB.reviewRequests[ reviewRequestId ].withinLimit ) {
				reviewRequestsUserBCount++;
			}
		}


		if ( reviewsUserACount > reviewsUserBCount ) {
			return -1;
		} else if ( reviewsUserACount < reviewsUserBCount ) {
			return 1;
		} else if ( reviewRequestsUserACount > reviewRequestsUserBCount ) {
			return -1;
		} else {
			return 1;
		}
	} );

	return {
		reviewRequests: reviewRequests,
		users: users,
		allowed: store.users.allowed,
		...props
	}
} )
export default class GroupTable extends React.Component {

	_updateRanking() {

	}

	componentWillUpdate(){
		this._updateRanking();
	}

	render() {
		let users = [];

		for ( let i = 0; i < this.props.users.length; i++ ) {
			let user = this.props.users[ i ];
			if ( this.props.allowed[ user.username ] !== -1 ) {
				users.push(
					<UserRow key={i} ranking={i+1} user={user} group={this.props.name} />
				)
			}
		}

		return (
			<div class="col-md-4">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">{this.props.name}</h3>
					</div>
					<div class="panel-body">
						<table class="table table-striped">
							<thead>
							<tr>
								<th>#</th>
								<th>Username</th>
								<th>R</th>
								<th>RR</th>
							</tr>
							</thead>
							<tbody>
							{users}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}