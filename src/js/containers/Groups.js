import React from "react"
import { connect } from "react-redux"

import GroupTable from "../components/groupTable"

@connect( ( store ) => {
	return {
		groups: store.groups
	}
} )
export default class Groups extends React.Component {

	render() {
		let groups = [];
		for ( let i = 0; i < this.props.groups.length; i++ ) {
			let groupName = this.props.groups[ i ];
			groups.push( <GroupTable key={i} name={groupName} /> )
		}
		return (
			<div class="row">
				{groups}
			</div>
		);
	}
}