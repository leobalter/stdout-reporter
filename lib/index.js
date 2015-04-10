var chalk = require( "chalk" );
var log = {
        write: function( text ) {
            process.stdout.write( text );
        },
        error: function( text ) {
            process.stderr.write( chalk.red( text ) );
        },
        ok: function( text ) {
            process.stdout.write( chalk.green( text ) );
        }
    };

module.exports = function Reporter( options ) {
    if ( !( this instanceof Reporter ) ) {
        return new Reporter( options );
    }

    options = options || {};

    this.moduleStart = moduleStart;
    this.testStart = testStart;
    this.assertion = assertion;
    this.testDone = testDone;
    this.done = done;

    function moduleStart( details ) {
        if ( options.output === "minimal" ) {
            return;
        }

        log.write( chalk.bold( details.name + "\n" ) );
    }

    function testStart( details ) {
        var message;

        if ( options.output === "minimal" ) {
            return;
        }

        message = "  " + details.name;

        if ( options.output !== "verbose" ) {
            message += " ";
        }

        log.write( message );
    }

    function assertion( details ) {
        if ( !details.result ) {
            log.error( chalk.bold( "\n    FAILED!" ) );

            if ( options.output === "minimal" ) {
                log.error( "\n    Module: " + details.module );
                log.error( "\n    Test: " + details.name );
                log.error( "\n    Assertion: " + details.message );
            } else {
                log.error( " " + details.message );
            }

            log.error( chalk.bold( "\n    Actual: " ) + details.actual );
            log.error( chalk.bold( "\n    Expected: " ) + details.expected );

            if ( details.source ) {
                log.error( "\n  " + details.source );
            }

            log.error( "\n" );
        } else if ( options.output === "verbose" ) {
            log.ok( "\n    " + ( details.message || "\u2605" ) );
        } else {
            log.ok( "." );
        }
    }

    function testDone( details ) {
        if ( options.output !== "minimal" ) {
            log.write( "\n" );
        }

        if ( options.output === "verbose" ) {
            log.write( "    " );
            if ( details.failed === 0 ) {
                log.ok( "test passed" );
            } else {
                log.error( "test failed" );
            }
            log.write( " - " + details.runtime + "ms\n" );
        }
    }

    function done( details ) {
        var succeeded = ( details.failed === 0 ),
            message = details.total + " assertions in " + details.runtime + "ms, passed: " +
                details.passed + ", failed: " + details.failed;

        log.write( "\n" );

        if ( succeeded ) {
            log.ok( message );
        } else {
            log.error( message );
        }

        log.write( "\n" );
    }
};
