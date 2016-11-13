import axios from "../axios";

const ONE_WEEK = 60 * 60 * 1000 * 24 * 7;

function getCurrentDateTime() {
	let currentDate = new Date();

	currentDate.setMinutes( 0 );
	currentDate.setHours( 0 );
	currentDate.setSeconds( 0 );

	return currentDate.getTime();
}

function isWithinLimit( date ) {
	let withinLimit = false;
	let endDate = getCurrentDateTime();
	let startDate = endDate - ONE_WEEK;

	let dateTime = new Date( date ).getTime();
	if ( dateTime >= startDate && dateTime <= endDate ) {
		withinLimit = true;
	}
	
	return withinLimit;
}

export function getUsersGroup( groupName, getReviewRequests ) {
	return function ( dispatch ) {
		dispatch( {
			type: "FETCH_USERS_GROUP",
			payload: axios( `groups/${groupName}/users`).
			then( ( results ) => {
				getReviewRequests( groupName );
				return results;
			} )
		} );
	}
}

export function updateUserReviews( review, group ) {
	let username = review.links.user.title;
	let id = review.id;
	let date = review.timestamp;
	let withinLimit = isWithinLimit( date );

	return function ( dispatch ) {
		dispatch( {
			type: "UPDATE_USER_REVIEWS",
			payload: { username, id, group, date, withinLimit }
		} )
	}
}

export function updateUserReviewRequests( reviewRequest ) {
	let username = reviewRequest.links.submitter.title;
	let groups = reviewRequest.target_groups.map( ( group ) => group.title );
	let id = reviewRequest.id;
	let date = reviewRequest.time_added;
	let withinLimit = isWithinLimit( date );

	return function ( dispatch ) {
		dispatch( {
			type: "UPDATE_USER_REVIEW_REQUESTS",
			payload: { username, id, groups, date, withinLimit }
		} )
	}
}