var spawn = require( "spawn-sync" );
var path = require( "path" );
var QUnit = global.QUnit;
var fs = require( "fs" );
var Reporter = require( "../lib/index" );

QUnit.module( "core" );

QUnit.test( "methods", function( assert ) {
    var reporter = Reporter();

    [
        "moduleStart",
        "testStart",
        "assertion",
        "testDone",
        "done"
    ].forEach( function( method ) {
        assert.equal( typeof reporter[ method ], "function", "has " + method );
        assert.equal( reporter[ method ].length, 1, method + " accepts details parameter" );
    } );
} );

QUnit.module( "modes" );

[ "minimal", "regular", "verbose" ].forEach( function( mode ) {
    var output = fs.readFileSync( path.resolve( __dirname, "output/", mode + ".txt" ), "utf-8" );

    var result = spawn( "node", [ path.resolve( __dirname, "output" ), mode ], {
            encoding: "utf-8"
        } );

    var stdout = result.stdout.trim();
    var stderr = result.stderr.trim();

    QUnit.test( mode, function( assert ) {
        assert.equal( stdout + stderr, output.trim(), "stdout" );
    } );
} );
