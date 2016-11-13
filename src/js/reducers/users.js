let initialState = {
	allowed: {},
	usersGroup: {},
	totals: {}
};

const allowedUsers = [
	'ext.goncalo.cardoso',
	'ext.goncalo.assuncao',
	'ext.ines.ranha',
	'ext.tiago.fernandes',
	'ext.bruno.assuncao'
];

for ( let i = 0; i < allowedUsers.length; i++ ) {
	initialState.allowed[ allowedUsers[ i ] ] = 1;
}

export default function ( state = initialState, action ) {
	switch ( action.type ) {
		case "FETCH_USERS_GROUP_FULFILLED":
			let users = [];
			let group = action.payload.data.groupName;
			let obj = {
				...state,
				usersGroup: {
					...state.usersGroup
				}
			};

			for ( let i = 0; i < action.payload.data.users.length; i++ ) {
				let user = action.payload.data.users[ i ];
				if ( obj.allowed[ user.username ] ) {
					users.push( user );
					if ( obj.allowed[ user.username ] ) {
						obj.allowed[ user.username ] = user;
						obj.totals[ user.username ] = { ...obj.totals[ user.username ] };
						obj.totals[ user.username ][ group ] = {
							reviews: {},
							reviewRequests: {}
						};
					}
				}
			}

			obj.usersGroup[ group ] = users;

			return obj;

		case "UPDATE_USER_REVIEWS":
		{
			let obj = { ...state };
			let username = action.payload.username;

			if ( obj.allowed[ username ] ) {
				let group = action.payload.group;
				let reviewId = action.payload.id;

				obj.totals = { ...obj.totals };
				obj.totals[ username ] = { ...obj.totals[ username ] };
				obj.totals[ username ][ group ] = { ...obj.totals[ username ][ group ] };
				obj.totals[ username ][ group ].reviews = obj.totals[ username ][ group ].reviews || {};

				if ( !obj.totals[ username ][ group ].reviews[ reviewId ] ) {
					obj.totals[ username ][ group ].reviews[ reviewId ] = action.payload;
				}
			}

			return obj;
		}

		case "UPDATE_USER_REVIEW_REQUESTS":
		{
			let obj = { ...state };
			let username = action.payload.username;

			if ( obj.allowed[ username ] ) {
				let group = action.payload.groups[ 0 ];
				let reviewRequestId = action.payload.id;

				obj.totals = { ...obj.totals };
				obj.totals[ username ] = { ...obj.totals[ username ] };
				obj.totals[ username ][ group ] = { ...obj.totals[ username ][ group ] };
				obj.totals[ username ][ group ].reviewRequests = obj.totals[ username ][ group ].reviewRequests || {};

				if ( !obj.totals[ username ][ group ].reviewRequests[ reviewRequestId ] ) {
					obj.totals[ username ][ group ].reviewRequests[ reviewRequestId ] = action.payload;
				}
			}

			return obj;
		}

		default:
			return { ...state };
	}
}