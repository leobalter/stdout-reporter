var Reporter = require( "../lib/index" );

var mode = process.argv[ 2 ];

var reporter = Reporter( { output: mode } );

reporter.moduleStart( {
    name: "foo"
} );

reporter.testStart( {
    name: "bar"
} );

reporter.assertion( {
    result: true,
    module: "logFoo",
    name: "logBar",
    message: "logMessage",
    source: "logSource",
    actual: 1,
    expected: 2
} );

reporter.assertion( {
    result: false,
    module: "logFoo",
    name: "logBar",
    message: "logMessage",
    source: "logSource",
    actual: 1,
    expected: 2
} );

reporter.testDone( {
    failed: 0,
    runtime: 123
} );

reporter.testDone( {
    failed: 1,
    runtime: 234
} );

reporter.done( {
    failed: 0,
    total: 1,
    passed: 1,
    runtime: 345
} );

reporter.done( {
    failed: 1,
    total: 1,
    passed: 0,
    runtime: 456
} );
