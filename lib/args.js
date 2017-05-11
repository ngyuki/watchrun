'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var help = '\nUsage: watchrun [-w pattern]... [-i interval] [-d delay] <command> [args]...\n\n    -w pattern\n        Glob patterns (default: **/*).\n\n    -i interval\n        Pooling interval milliseconds (default: 500).\n\n    -d delay\n        Execute delay milliseconds (default: 250).\n\n    command\n        This command run when directory has been changed.\n\n    args\n        Arguments of command.\n';

function usage() {
    console.error(help.trim());
    process.exit(1);
}

function parse(args) {
    var commandArgs = null;
    var patterns = [];
    var interval = 500;
    var delay = 250;

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];

        switch (arg) {
            case '-w':
                arg = args[++i];
                if (arg == null) {
                    return false;
                }
                patterns.push(arg);
                break;

            case '-i':
                interval = args[++i];
                break;

            case '-d':
                delay = args[++i];
                break;

            default:
                if (arg === '--') {
                    commandArgs = args.slice(++i);
                } else if (arg[0] === '-') {
                    return false;
                } else {
                    commandArgs = args.slice(i);
                }
                break;
        }

        if (commandArgs) {
            break;
        }
    }

    if (commandArgs == null || commandArgs.length == 0) {
        return false;
    }

    if (patterns.length == 0) {
        patterns = ['**/*'];
    }

    interval = parseInt(interval);
    delay = parseInt(delay);

    if (interval !== interval || interval < 0) {
        return false;
    }

    if (delay !== delay || delay < 0) {
        return false;
    }

    return {
        commandArgs: commandArgs,
        patterns: patterns,
        interval: interval,
        delay: delay
    };
}

exports.default = {
    parse: parse,
    usage: usage
};