import { Args } from './args.mjs';

export interface Context {
  args: Args;
  program: {
    instructions: string;
    input: string;
    pointer: number;
    stackPointer: number[];
  };
  memory: {
    buffer: number[];
    address: number;
    bufferExtendSize: number;
    maxBufferSize: number;
    minValue: number;
    maxValue: number;
  };
  output: string;
};

export function initContext(args: Args): Context {
  return {
    args,
    program: {
      instructions: args.instructions,
      input: args.input,
      pointer: 0,
      stackPointer: [],
    },
    memory: {
      buffer: Array(10).fill(0),
      address: 0,
      bufferExtendSize: 5,
      maxBufferSize: Number.MAX_SAFE_INTEGER,
      minValue: Number.MIN_VALUE,
      maxValue: Number.MAX_VALUE,
    },
    output: '',
  };
}
