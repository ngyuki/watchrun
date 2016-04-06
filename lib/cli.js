'use strict';

var _args = require('./args');

var _args2 = _interopRequireDefault(_args);

var _watch = require('./watch');

var _watch2 = _interopRequireDefault(_watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = _args2.default.parse(process.argv.slice(2));

if (opts == false) {
    _args2.default.usage();
    process.exit(1);
} else {
    _watch2.default.watch(opts);
}