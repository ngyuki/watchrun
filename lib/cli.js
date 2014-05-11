var sys = require('sys');

function usage()
{
    /**
     * Usage: watchrun <path>... -- <command> [args]...
     *
     *     path        Watching paths
     *     command     This command run when directory has been changed
     *     args        Arguments of command
     */

    usage.toString().match(/^[ \t]+\*(?: .*)?$/gm).forEach(function (line) {
        sys.error(line.replace(/^\s+\*\s?/, ''));
    });

    process.exit(1);
}

function main(argv)
{
    var paths = [];
    var commandArgs = [];
    var flg = false;

    argv.forEach(function (v) {
        if (!flg)
        {
            if (v.charAt(0) !== '-')
            {
                paths.push(v);
                return;
            }

            flg = true;

            if (v === '--')
            {
                return;
            }
        }
        if (flg)
        {
            commandArgs.push(v);
        }
    });

    if (paths.length === 0)
    {
        usage();
    }

    if (commandArgs.length === 0)
    {
        usage();
    }

    require('./watch').watch(paths, commandArgs);
}

module.exports = {
    main: main
};
