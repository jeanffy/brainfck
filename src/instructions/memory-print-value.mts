import { Context } from '../context.mjs';

export function memoryPrintValue(ctx: Context): void {
  const value = ctx.memory.buffer[ctx.memory.address];
  const char = (String.fromCharCode(value));
  ctx.output += char;
  ctx.program.pointer++;
}
