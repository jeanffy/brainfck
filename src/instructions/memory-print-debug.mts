import { Context } from '../context.mjs';

export function memoryPrintDebug(ctx: Context): void {
  if (ctx.args.extended) {
    console.log(`memory : ${ctx.memory.buffer.join(', ')}`);
    console.log(`address: ${ctx.memory.address}`);
    console.log(`input: ${ctx.program.input}`);
  }
  ctx.program.pointer++;
}
