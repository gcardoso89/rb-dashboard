const initialState = {};

export function reviewRequests ( state = initialState, action ) {
	switch ( action.type ) {
		case "FETCH_REVIEW_REQUESTS_FULFILLED": {
			let obj = {};
			obj[ action.payload.data.groupName ] = action.payload.data.reviewRequests;
			return { ...state, ...obj };
		}
	}
	return state;
}

export function reviews ( state = initialState, action ) {
	switch ( action.type ) {
		case "FETCH_REVIEWS_PENDING": {
			let obj = {};
			return { ...state, ...obj };
		}
		case "FETCH_REVIEWS_FULFILLED": {
			let obj = {};
			obj[ action.payload.data.reviewRequestId ] = action.payload.data.reviews;
			return { ...state, ...obj };
		}
	}
	return state;
}