import assert from 'assert'
import args from '../src/args'

describe ("args", () => {

    it ("parse: ok", () => {
        var opts = args.parse('-w aaa -w zzz -i 123 -d 456 ore are'.split(/\s+/));

        assert.deepEqual(opts.commandArgs, ['ore', 'are']);
        assert.deepEqual(opts.patterns, ['aaa', 'zzz']);
        assert.equal(opts.interval, 123);
        assert.equal(opts.delay, 456);
    })

    it ("parse: double dash", () => {
        var opts = args.parse('-w aaa -w zzz -i 123 -d 456 -- - ore -- are'.split(/\s+/));

        assert.deepEqual(opts.commandArgs, ['-', 'ore', '--', 'are']);
        assert.deepEqual(opts.patterns, ['aaa', 'zzz']);
        assert.equal(opts.interval, 123);
        assert.equal(opts.delay, 456);
    })

    it ("parse: defaults", () => {
        var opts = args.parse('ore are'.split(/\s+/));

        assert.deepEqual(opts.commandArgs, ['ore', 'are']);
        assert.deepEqual(opts.patterns, ['**/*']);
        assert.equal(opts.interval, 500);
        assert.equal(opts.delay, 250);
    })

    it ("parse: no command", () => {
        var opts = args.parse('-w aaa -w zzz -i 123 -d 456'.split(/\s+/));
        assert.equal(opts, false);
    })

    it ("parse: -i is not number", () => {
        var opts = args.parse('-w aaa -w zzz -i xxx -d 456 ore are'.split(/\s+/));
        assert.equal(opts, false);
    })

    it ("parse: -d is not number", () => {
        var opts = args.parse('-w aaa -w zzz -i 123 -d xxx ore are'.split(/\s+/));
        assert.equal(opts, false);
    })

    it ("parse: unknown option", () => {
        var opts = args.parse('-w aaa -w zzz -x -i 123 -d xxx ore are'.split(/\s+/));
        assert.equal(opts, false);
    })
})
