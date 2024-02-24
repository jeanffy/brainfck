import readline from 'node:readline';
import { Context } from '../context.mjs';

export async function memoryInputValue(ctx: Context): Promise<void> {
  let char: string;
  if (ctx.program.input.length > 0) {
    char = ctx.program.input[0];
    ctx.program.input = ctx.program.input.slice(1);
  } else {
    char = await new Promise<string>(resolve => {
      readline.emitKeypressEvents(process.stdin);
      process.stdin.resume();
      process.stdin.setRawMode(true);
      process.stdin.on('keypress', char => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        resolve(char);
      });
    });
  }
  ctx.memory.buffer[ctx.memory.address] = char.charCodeAt(0);
  ctx.program.pointer++;
}
