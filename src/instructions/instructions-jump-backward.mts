import { Context } from '../context.mjs';

export function instructionsJumpBackward(ctx: Context): void {
  const memoryValue = ctx.memory.buffer[ctx.memory.address];
  if (memoryValue !== 0) {
    const nextPointer = ctx.program.stackPointer.pop();
    if (nextPointer === undefined) {
      throw new Error('empty stack pointer');
    }
    ctx.program.pointer = nextPointer;
  } else {
    ctx.program.stackPointer.pop(); // just remove the stacked pointer
    ctx.program.pointer++;
  }
}
