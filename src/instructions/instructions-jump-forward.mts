import { Context } from '../context.mjs';
import { Language } from './language.mjs';

export function instructionsJumpForward(ctx: Context): void {
  const memoryValue = ctx.memory.buffer[ctx.memory.address];
  if (memoryValue === 0) {
    const nextPointer = findCorrespondingClosingInstruction(ctx);
    if (nextPointer === undefined) {
      throw new Error(`closing '${Language.JumpBackward}' not found`);
    }
    ctx.program.pointer = nextPointer + 1;
  } else {
    ctx.program.stackPointer.push(ctx.program.pointer);
    ctx.program.pointer++;
  }
}

function findCorrespondingClosingInstruction(ctx: Context): number | undefined {
  let pointer: number | undefined;

  let i = ctx.program.pointer;
  let openCount = 0;
  while (pointer === undefined) {
    i++;

    if (i >= ctx.program.instructions.length) {
      // closing instruction not found as we are at then end of the instructions string
      break;
    }

    const char = ctx.program.instructions[i];
    if (char === Language.JumpForward) {
      // handles nested jump instructions
      openCount++;
    } else if (char === Language.JumpBackward) {
      if (openCount > 0) {
        // it is a nested closing instruction, so keep going
        openCount--;
      } else {
        pointer = i;
      }
    }
  }

  return pointer;
}
