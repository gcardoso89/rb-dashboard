import axios from "axios";

export default axios.create( {
	baseURL: '/api/',
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		'Accept': 'application/json'
	}
})
