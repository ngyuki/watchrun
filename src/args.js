import sys from 'util'

const help = `
Usage: watchrun [-w pattern]... [-i interval] [-d delay] <command> [args]...

    -w pattern
        Glob patterns (default: **\/*).

    -i interval
        Pooling interval milliseconds (default: 500).

    -d delay
        Execute delay milliseconds (default: 250).

    command
        This command run when directory has been changed.

    args
        Arguments of command.
`;

function usage()
{
    console.error(help.trim())
    process.exit(1);
}

function parse(args)
{
    let commandArgs = null;
    let patterns = [];
    let interval = 500;
    let delay = 250;

    for (let i=0; i<args.length; i++) {
        let arg = args[i];

        switch (arg) {
            case '-w':
                arg = args[++i];
                if (arg == null) {
                    return false;
                }
                patterns.push(arg)
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

    if ((interval !== interval) || (interval <= 0)) {
        return false;
    }

    if ((delay !== delay) || (delay <= 0)) {
        return false;
    }

    return {
        commandArgs: commandArgs,
        patterns: patterns,
        interval: interval,
        delay: delay,
    };
}

export default {
    parse,
    usage
}
