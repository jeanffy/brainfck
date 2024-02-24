import { Context } from '../context.mjs';

export function memoryValueDecrement(ctx: Context, count: number): void {
  let newValue = ctx.memory.buffer[ctx.memory.address] - count;
  if (newValue < ctx.memory.minValue) {
    newValue = ctx.memory.maxValue;
  }
  ctx.memory.buffer[ctx.memory.address] = newValue;
  ctx.program.pointer++;
}
