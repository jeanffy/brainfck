import { initContext } from './context.mjs';
import { memoryAddressIncrement } from './instructions/memory-address-increment.mjs';
import { memoryValueIncrement } from './instructions/memory-value-increment.mjs';
import { memoryAddressDecrement } from './instructions/memory-address-decrement.mjs';
import { memoryValueDecrement } from './instructions/memory-value-decrement.mjs';
import { memoryPrintValue } from './instructions/memory-print-value.mjs';
import { AdditionLanguage, Language } from './instructions/language.mjs';
import { instructionsJumpForward } from './instructions/instructions-jump-forward.mjs';
import { instructionsJumpBackward } from './instructions/instructions-jump-backward.mjs';
import { skipComment } from './instructions/skip-comment.mjs';
import { memoryInputValue } from './instructions/memory-input-value.mjs';
import { getArgs } from './args.mjs';
import { defaultInstruction } from './instructions/default-instruction.mjs';
import { memoryPrintDebug } from './instructions/memory-print-debug.mjs';

const args = await getArgs();
const ctx = initContext(args);

try {
  let instructionsLeft = true;
  while (instructionsLeft) {
    const currentInstruction = ctx.program.instructions[ctx.program.pointer];
    switch (currentInstruction) {
      case Language.AddressIncrement:
        memoryAddressIncrement(ctx, 1);
        break;
      case Language.AddressDecrement:
        memoryAddressDecrement(ctx, 1);
        break;
      case Language.ValueIncrement:
        memoryValueIncrement(ctx, 1);
        break;
      case Language.ValueDecrement:
        memoryValueDecrement(ctx, 1);
        break;
      case Language.PrintValue:
        memoryPrintValue(ctx);
        break;
      case Language.InputValue:
        await memoryInputValue(ctx);
        break;
      case Language.JumpForward:
        instructionsJumpForward(ctx);
        break;
      case Language.JumpBackward:
        instructionsJumpBackward(ctx);
        break;
      case AdditionLanguage.Comment:
        skipComment(ctx);
        break;
      case AdditionLanguage.PrintDebug:
        memoryPrintDebug(ctx);
        break;
      default:
        defaultInstruction(ctx);
    }

    if (ctx.program.pointer >= ctx.program.instructions.length) {
      instructionsLeft = false;
    }
  }

  process.stdout.write(ctx.output);
} catch (error) {
  process.stdout.write(ctx.output);
  console.error();
  console.error('--');
  console.error(error);
}
