import args from './args'
import watch from './watch'

var opts = args.parse(process.argv.slice(2));

if (opts == false) {
    args.usage();
    process.exit(1);
} else {
    watch.watch(opts);
}
