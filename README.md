# brainfk

This is a [brainfuck](http://en.wikipedia.org/wiki/Brainfuck) interpreter.

## Instructions

Official instructions are handled, see https://en.wikipedia.org/wiki/Brainfuck#Language_design. Any other character different from these is ignored.

Additional instructions are handled when using the `--extended` option:

- `;`: comment - ignore all characters until next line (new line character is `\n` - value 10)
- `#`: prints some debugging information

> When using extended mode, not recognized characters in instructions trigger an error instead of begin ignored.

## Usage

The program can be run with either:

- a file: `npm start -- [options] </path/to/file> [input-string]`
- a set of instructions: `npm start -- [options] <instructions> [input-string]`

Options can be:

- `--extended`: activates additional instructions

## Input string

You can add an optional input string that will be consumed when instructions request an input.

When instructions request an input (`,`), the program first pops a charracter from the input string if possible, and falls back with waiting for the user to press a key.

For example, with the command `npm start -- ,.,.,.,.,. hello` the program will print `hello` without waiting for the user input.

## Memory

Memory is unlimited and can be extended in any direction with `>` and `<` (a maximum size has however been defined).

When incrementing/decrementing memory values, if value exceeds the maximum value, it goes to the minimum value, and back again.

These sizes and values are defined in the context in the `initContext` function.

## Reference

- https://esolangs.org/wiki/Brainfuck
- http://en.wikipedia.org/wiki/Brainfuck
- https://gist.github.com/rdebath/0ca09ec0fdcf3f82478f
- http://brainfuck.org
- https://stackoverflow.com/a/19869651
