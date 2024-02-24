import { Context } from '../context.mjs';

export function memoryAddressDecrement(ctx: Context, count: number): void {
  ctx.memory.address -= count;
  if (ctx.memory.address < 0) {
    // extend buffer in the negatives indices (left of 0)
    if (ctx.memory.buffer.length >= ctx.memory.maxBufferSize) {
      // buffer auto expands itself, however it is still limited
      throw new Error('memory overflow');
    }
    ctx.memory.buffer = [...Array(ctx.memory.bufferExtendSize).fill(0), ...ctx.memory.buffer];
    ctx.memory.address += ctx.memory.bufferExtendSize;
  }
  ctx.program.pointer++;
}
