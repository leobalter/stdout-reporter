module.exports = function( grunt ) {

require( "load-grunt-tasks" )( grunt );

grunt.initConfig( {
	pkg: grunt.file.readJSON( "package.json" ),
	jshint: {
		options: {
			jshintrc: true
		},
		all: [
			"Gruntfile.js",
			"{lib,test}/**/*.js"
		]
	},
	jscs: {
		options: {
			config: ".jscsrc"
		},
		all: [
			"<%= jshint.all %>"
		]
	},
	watch: {
		options: {
			atBegin: true
		},
		files: [
			".jshintrc",
			".jscsrc",
			"Gruntfile.js",
			"{lib,test}/**/*.js"
		],
		tasks: "default"
	}
} );

grunt.registerTask( "test", function() {
	var done = this.async();

	var QUnit = global.QUnit = require( "qunitjs" );
	var stdout = require( "qunit-reporter-stdout" );

	// init the stdout
	stdout( QUnit );

	require( "./test/index" );

	QUnit.done( function( details ) {
		done( details.failed === 0 );
	} );

	QUnit.load();
} );

grunt.registerTask( "default", [ "jshint", "jscs", "test" ] );

};
