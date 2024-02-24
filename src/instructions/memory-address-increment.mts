import { Context } from '../context.mjs';

export function memoryAddressIncrement(ctx: Context, count: number): void {
  ctx.memory.address += count;
  // if address overflows buffer length, extend buffer
  if (ctx.memory.address >= ctx.memory.buffer.length) {
    if (ctx.memory.buffer.length >= ctx.memory.maxBufferSize) {
      // buffer auto expands itself, however it is still limited
      throw new Error('memory overflow');
    }
    ctx.memory.buffer = [...ctx.memory.buffer, ...Array(ctx.memory.bufferExtendSize).fill(0)];
  }
  ctx.program.pointer++;
}
