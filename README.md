# stdout-reporter

A tool to report test results on node's stdout.

## Install

```
npm install --save-dev stdout-reporter
```

## Usage

```js
var Reporter = require( "stdout-reporter" );
var reporter = new Reporter( [ options ] );

/* and then you set your logging methods */
...
```

### Logging Methods

- `moduleStart`: register a module start
  - requires a details object as the argument with the following properties:
    - `name`: the module's name
- `testStart`: register a test start
  - requires a details object as the argument with the following properties:
    - `name`: the test's name
- `assertion`: register an assertion execution
  - requires a details object as the argument with the following properties:
    - `module`: a string with the module's name
    - `name`: a string with the test's name
    - `result` a Boolean value for the result (`true` if passed)
    - `message`: a string with the assertion's message
    - `source`: [optional] a string with the the stacktrace information
    - `actual`: the assertion given value to be compared with the expected object
    - `expected`: the expected value
- `testDone`: register a test ending
  - requires a details object as the argument with the following properties:
    - `failed`: a number with the failed assertions in the test
    - `runtime`: a number representing the runtime in ms
- `done`: register a run ending
  - requires a details object as the argument with the following properties:
    - `total`: a number with the total assertions
    - `failed`: a number with the failed assertions
    - `passed`: a number with the passed assertions
    - `runtime`: a number representing the runtime in ms

### Options

This module can be instatiated with an options object as its argument.

- `output`: none (default), `"minimal"` or `"verbose"`
  - with no given value, the default output will list the modules and test names, followed by dots representing each passing assertion.
  - `minimal` will omit the modules and tests names on the output.
  - `verbose` will print a more detailed output.
