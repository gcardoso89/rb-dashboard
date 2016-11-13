var config = require('./config');
var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var exec = require( 'child_process' ).exec;
var routes = require( './routes/index' );
var api = require( './routes/api' );
var app = express();
var webpack = require( './webpack.config' );

if ( process.env !== "production" ){
	webpack.watch( {},
		function( error, stats ){
			if ( stats.hasErrors() ){
				console.log( "Got errors!" );
			} else {
				console.log( "Didn't get errors!" );
			}
		}
	);
} else {
	webpack.run(
		function (err, stats) {
			if ( !stats.hasErrors() ){
				console.log( "File sucessfully compiled");
			}
		}
	);
}


// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( require( 'node-sass-middleware' )( {
	src: path.join( __dirname, '/src' ),
	dest: path.join( __dirname, '/src' ),
	indentedSyntax: false
} ) );
app.use( express.static( path.join( __dirname, 'src' ) ) );

app.use( '/', routes );
app.use( '/api', api );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
	app.use( function ( err, req, res, next ) {
		res.status( err.status || 500 );
		res.render( 'error', {
			message: err.message,
			error: err
		} );
	} );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
	res.status( err.status || 500 );
	res.render( 'error', {
		message: err.message,
		error: {}
	} );
} );

module.exports = app;
