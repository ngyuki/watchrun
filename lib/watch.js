'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _child_process = require('child_process');

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _args2 = require('./args');

var _args3 = _interopRequireDefault(_args2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _command = void 0;
var _args = void 0;
var _delay = void 0;
var _delaying = false;
var _running = false;

function watch(opts) {
    _args = opts.commandArgs.slice(0);
    _command = _args.shift();
    _delay = opts.delay;

    console.error(("Command: " + _util2.default.inspect(opts.commandArgs)).cyan);
    console.error(("Pattern: " + _util2.default.inspect(opts.patterns)).cyan);

    // add default ignore pattern
    var ignored = [/(^|[\/\\])\../, /(^|[\/\\])node_modules$/, /(^|[\/\\])vendor$/];

    var watcher = _chokidar2.default.watch(opts.patterns, {
        ignored: ignored,
        ignoreInitial: true,
        usePolling: opts.interval > 0,
        interval: opts.interval,
        binaryInterval: opts.interval
    });

    watcher.on('ready', function () {
        prompt();
        watcher.on('all', function (event, filename) {
            changed(event, filename);
        });
    });
}

function prompt() {
    console.error("\nWaiting...".cyan);
}

function changed(event, filename) {
    if (_running) {
        return;
    }
    if (event && filename) {
        console.error((" " + event + " " + filename).magenta);
    }
    if (_delaying) {
        return;
    }
    _delaying = true;
    setTimeout(function () {
        _running = true;
        _delaying = false;
        console.error("Running...".cyan);
        execute(function () {
            _running = false;
            _delaying = false;
            prompt();
        });
    }, _delay);
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