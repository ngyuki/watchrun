# watchrun

Watching directory to ad hoc will run command.

## Install

```console
$ npm install -g ngyuki/node-watchrun
```

## Example

Watching current directory.

```console
$ watchrun ./ -- date
Command: [ 'date' ]
Waiting...
```

Update file by other console.

```console
$ touch ./README.md
```

`date` command is run on first console. 

```console
$ watchrun ./ -- date
Command: [ 'date' ]
Waiting... update README.md

Thu May 22 09:25:49 JST 2014

Waiting...
```

## Use Shell

*watchrun* does not use shell to run command.
Therefore, the following does not work.

```
watchrun a.c -- 'gcc a.c && ./a.out'
```

Please use `-c` option of bash as below.

```
watchrun a.c -- bach -c 'gcc a.c && ./a.out'
```
