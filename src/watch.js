import sys from 'util'
import { spawn } from 'child_process'
import gaze from 'gaze'
import colors from 'colors'
import args from './args'

let _command;
let _args;
let _running = false;

function watch(opts)
{
    _args = opts.commandArgs.slice(0);
    _command = _args.shift();

    sys.puts(("Command: " + sys.inspect(opts.commandArgs)).cyan);
    sys.puts(("Pattern: " + sys.inspect(opts.patterns)).cyan);

    // add default ignore pattern
    let patterns = [].concat(opts.patterns, ['!node_modules/**']);

    gaze(patterns, { interval: opts.interval, debounceDelay: opts.delay }, (err, watcher) => {
        prompt();
        watcher.on('all', (event, filename) => { changed(event, filename) });
    });
}

function prompt()
{
    sys.print("\nWaiting...".cyan);
}

function changed(event, filename)
{
    if (!_running) {
        _running = true;

        if (event && filename) {
            sys.puts((" " + event + " " + filename).magenta);
        }

        execute(() => {
            _running = false;
            prompt();
        });
    }
}

function execute(done)
{
    spawn(_command, _args, { stdio: 'inherit' })
        .on('error', (err) => {
            sys.print(("\n" + err + "\n").redBG);
            done();
        })
        .on('exit', () => {
            done();
        })
}

export default {
    watch: watch
}
