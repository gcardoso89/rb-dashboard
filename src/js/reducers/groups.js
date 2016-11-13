const initialState = [
	'a-mobile-games',
	'a-mobile-libs',
	'a-mobile-logic'
];

export default function ( state = initialState, action ) {
	switch ( action.type ) {
		case "ADD_GROUP": {
			return [ ...state, action.payload ]
		}
	}
	return state;
}