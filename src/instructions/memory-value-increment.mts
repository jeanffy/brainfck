import { Context } from '../context.mjs';

export function memoryValueIncrement(ctx: Context, count: number): void {
  let newValue = ctx.memory.buffer[ctx.memory.address] + count;
  if (newValue > ctx.memory.maxValue) {
    newValue = ctx.memory.minValue;
  }
  ctx.memory.buffer[ctx.memory.address] = newValue;
  ctx.program.pointer++;
}
