var express = require( 'express' );
var http = require( 'http-request' );
var router = express.Router();
var path = require( 'path' );
var reviewBoardPath = process.env.REVIEWBOARD_BASE_URL + '/api/';
/* GET users listing. */

var authBase64ToObject = function( authorizationString ) {
	authorizationString = authorizationString.replace( 'Basic ', '' );
	var buffer = new Buffer( authorizationString, 'base64' );
	var authArr = buffer.toString().split( ':' );
	return {
		type: 'basic',
		username: authArr[0],
		password: authArr[1]
	}
};

router.get( '/', function( req, res, next ) {
	next();
} );

router.get( '/review-requests', function( req, res, next ) {

	var groupName = req.query['to-groups'];
	var timeAddedFrom = req.query['time-added-from'];
	var timeAddedTo = req.query['time-added-to'];

	http.get( {
		url: path.join( reviewBoardPath, 'review-requests/?max-results=500&to-groups=' + groupName /*+ '&time-added-from=' + timeAddedFrom + '&time-added-to=' + timeAddedTo*/ ),
		auth: authBase64ToObject( req.headers.authorization )
	}, function( error, httpRes ) {
		if ( error ) {
			httpRes.status( 500 );
			httpRes.end();
			return;
		}

		var httpObj = JSON.parse( httpRes.buffer.toString() );

		var obj = {
			groupName: groupName,
			reviewRequests: httpObj.review_requests
		};

		res.json( obj );
	} );

} );

router.get( '/review-requests/:id/reviews', function( req, res, next ) {

	var reviewRequestId = req.params['id'];
	http.get( {
		url: path.join( reviewBoardPath, 'review-requests/' + reviewRequestId + '/reviews/?max-results=500' ),
		auth: authBase64ToObject( req.headers.authorization )
	}, function( error, httpRes ) {
		if ( error ) {
			res.status( 500 );
			res.end();
			return;
		}

		var httpObj = JSON.parse( httpRes.buffer.toString() );
		var obj = {
			reviewRequestId: reviewRequestId,
			reviews: httpObj.reviews
		};

		res.json( obj );
	} );

} );

router.get( '/groups/:group_name/users/', function( req, res, next ) {

	var groupName = req.params['group_name'];
	http.get( {
		url: path.join( reviewBoardPath, 'groups/' + groupName + '/users/?max-results=500' ),
		auth: authBase64ToObject( req.headers.authorization )
	}, function( error, httpRes ) {
		if ( error ) {
			res.status( 500 );
			res.end();
			return;
		}

		var httpObj = JSON.parse( httpRes.buffer.toString() );
		var obj = {
			groupName: groupName,
			users: httpObj.users
		};

		res.json( obj );
	} );

} );

module.exports = router;
