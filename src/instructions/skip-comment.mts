import { Context } from '../context.mjs';

export function skipComment(ctx: Context): void {
  if (!ctx.args.extended) {
    return;
  }

  let char = ctx.program.instructions[ctx.program.pointer];
  while (char !== '\n') {
    ctx.program.pointer++;
    if (ctx.program.pointer >= ctx.program.instructions.length) {
      break;
    }
    char = ctx.program.instructions[ctx.program.pointer];
  }
}
