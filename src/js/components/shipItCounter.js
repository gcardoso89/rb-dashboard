import React from "react"
import { connect } from "react-redux"

@connect( ( store, props ) => {

	let reviews = store.reviews[ props.reviewRequestId ] || [];
	let count = 0;

	for ( var i = 0; i < reviews.length; i++ ) {
		let review = reviews[ i ];
		if ( review.ship_it ){
			count++;
		}
	}

	return {
		count: count,
		...props
	}
} )
export default class ShipItCounter extends React.Component {
	render() {
		return (
			<div>
				Number of Ship It's: {this.props.count}
			</div>
		);
	}
}