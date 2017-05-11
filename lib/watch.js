'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _child_process = require('child_process');

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _args2 = require('./args');

var _args3 = _interopRequireDefault(_args2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _command = void 0;
var _args = void 0;
var _running = false;

function watch(opts) {
    _args = opts.commandArgs.slice(0);
    _command = _args.shift();

    console.error(("Command: " + _util2.default.inspect(opts.commandArgs)).cyan);
    console.error(("Pattern: " + _util2.default.inspect(opts.patterns)).cyan);

    // add default ignore pattern
    var patterns = [].concat(opts.patterns, ['!node_modules/**']);

    (0, _gaze2.default)(patterns, { interval: opts.interval, debounceDelay: opts.delay }, function (err, watcher) {
        prompt();
        watcher.on('all', function (event, filename) {
            changed(event, filename);
        });
    });
}

function prompt() {
    process.stderr.write("\nWaiting...".cyan);
}

function changed(event, filename) {
    if (!_running) {
        _running = true;

        if (event && filename) {
            console.error((" " + event + " " + filename).magenta);
        }

        execute(function () {
            _running = false;
            prompt();
        });
    }
}

function execute(done) {
    (0, _child_process.spawn)(_command, _args, { stdio: 'inherit' }).on('error', function (err) {
        process.stderr.write(("\n" + err + "\n").redBG);
        done();
    }).on('exit', function () {
        done();
    });
}

exports.default = {
    watch: watch
};