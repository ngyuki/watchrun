# watchrun

Watching directory to ad hoc will run command.

## Demo

[![asciicast](https://asciinema.org/a/4QfKEro8sp4CaX5q4LkBJoExN.svg)](https://asciinema.org/a/4QfKEro8sp4CaX5q4LkBJoExN)

## Install

```console
$ npm install -g watchrun
```

## Example

Watching current directory.

```console
$ watchrun date
Command: [ 'date' ]
Pattern: [ '**/*' ]
```

Update file by other console.

```console
$ touch ./README.md
```

`date` command is run on first console. 

```console
$ watchrun ./ -- date
Command: [ 'date' ]

Waiting... changed README.md
Thu Apr  7 22:51:02 JST 2016

Waiting...
```

## Use Shell

*watchrun* does not use shell to run command.
Therefore, the following does not work.

```
watchrun 'gcc a.c && ./a.out'
```

Please use `-c` option of bash as below.

```
watchrun bach -c 'gcc a.c && ./a.out'
```
