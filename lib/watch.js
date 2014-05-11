var sys = require('sys');
var $spawn = require('child_process').spawn;
var $watchr = require('watchr');
var $colors = require('colors');

var _command;
var _args;
var _running = false;

function watch(paths, commandArgs)
{
    _args = commandArgs.slice(0);
    _command = _args.shift();

    prompt();

    $watchr.watch({
        paths: paths,
        listeners: {change:change},
        catchupDelay: 250,

        // support cifs
        preferredMethods: ['watchFile'],
        interval: 500
    });
}

function prompt()
{
    sys.print("\nWaiting...".cyan);
}

function change(event, filename)
{
    executeCommand(event, filename);
}

function executeCommand(event, filename)
{
    if (!_running)
    {
        _running = true;

        if (event && filename)
        {
            sys.puts((" " + event + " " + filename + "\n").magenta);
        }

        executeReality(function () {
            _running = false;
            prompt();
        });
    }
}

function executeReality(done)
{
    var proc = $spawn(_command, _args, {stdio: 'inherit'});

    proc.on('error', function (err) {
        sys.print(("\n" + err + "\n").redBG);
        done();
    });

    proc.on('exit', function(){
        done();
    });
}

module.exports = {
    watch: watch
};
