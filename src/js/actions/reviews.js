import axios from "../axios";

export function fetchReviewsByGroup( groupName, getReviews ) {
	
	return function ( dispatch ) {
		dispatch( {
			type: "FETCH_REVIEW_REQUESTS",
			payload: axios( 'review-requests', {
				params: {
					'to-groups': groupName
					//'time-added-from': previousDate.toISOString(),
					//'time-added-to': currentDate.toISOString()
				}
			} ).then( ( results ) => {
				for ( let i = 0; i < results.data.reviewRequests.length; i++ ) {
					getReviews( results.data.reviewRequests[ i ], groupName );
				}
				return results;
			} )
		} );
	}
}

export function getReviews( reviewRequest, group, updateTotalValues ) {

	let reviewRequestId = reviewRequest.id;

	return function ( dispatch ) {
		dispatch( {
			type: "FETCH_REVIEWS",
			payload: axios( `review-requests/${reviewRequestId}/reviews` ).then( ( results ) => {
				for ( let i = 0; i < results.data.reviews.length; i++ ) {
					updateTotalValues( results.data.reviews[ i ], group );
				}
				return results;
			} )
		} );
	}
}