import { Context } from '../context.mjs';

export function defaultInstruction(ctx: Context): void {
  if (ctx.args.extended) {
    const currentInstruction = ctx.program.instructions[ctx.program.pointer];
    if ([' ', '\t', '\r', '\n'].includes(currentInstruction)) {
      ctx.program.pointer++;
    } else {
      throw new Error(`syntax error, unknown instruction '${currentInstruction}'`);
    }
  } else {
    ctx.program.pointer++;
  }
}
