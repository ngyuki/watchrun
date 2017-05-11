import util from 'util'
import { spawn } from 'child_process'
import chokidar from 'chokidar'
import colors from 'colors'
import args from './args'

let _command;
let _args;
let _delay;
let _delaying = false;
let _running = false;

function watch(opts)
{
    _args = opts.commandArgs.slice(0);
    _command = _args.shift();
    _delay = opts.delay;

    console.error(("Command: " + util.inspect(opts.commandArgs)).cyan);
    console.error(("Pattern: " + util.inspect(opts.patterns)).cyan);

    // add default ignore pattern
    let ignored = [
        /(^|[\/\\])\../,
        /(^|[\/\\])node_modules$/,
        /(^|[\/\\])vendor$/,
    ];

    let watcher = chokidar.watch(
        opts.patterns, {
            ignored: ignored,
            ignoreInitial: true,
            usePolling: opts.interval > 0,
            interval: opts.interval,
            binaryInterval: opts.interval,
        }
    );

    watcher.on('ready', () => {
        prompt();
        watcher.on('all', (event, filename) => { changed(event, filename) });
    });
}

function prompt()
{
    console.error("\nWaiting...".cyan);
}

function changed(event, filename)
{
    if (_running) {
        return
    }
    if (event && filename) {
        console.error((" " + event + " " + filename).magenta);
    }
    if (_delaying) {
        return
    }
    _delaying = true;
    setTimeout(() => {
        _running = true;
        _delaying = false;
        console.error("Running...".cyan);
        execute(() => {
            _running = false;
            _delaying = false;
            prompt();
        })
    }, _delay)
}

function execute(done)
{
    spawn(_command, _args, { stdio: 'inherit' })
        .on('error', (err) => {
            process.stderr.write(("\n" + err + "\n").redBG);
            done();
        })
        .on('exit', () => {
            done();
        })
}

export default {
    watch: watch
}
