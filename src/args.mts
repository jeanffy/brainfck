import fs from 'node:fs/promises';
import util from 'node:util';

export interface Args {
  instructions: string;
  input: string;
  extended: boolean;
}

export async function getArgs(): Promise<Args> {
  const parsedArgs = util.parseArgs({
    allowPositionals: true,
    options: {
      help: {
        type: 'boolean',
        default: false,
        short: 'h',
      },
      extended: {
        type: 'boolean',
        default: false,
      },
    } as const,
  });

  if (parsedArgs.values.help) {
    console.error('usage: <program> [--extended] </path/to/file|instructions> [input]');
    process.exit(0);
  }

  if (parsedArgs.positionals.length === 0) {
    console.error(`file path or instructions not provided`);
    process.exit(1);
  }

  let filePathOrInstructions = parsedArgs.positionals[0];
  try {
    const stat = await fs.stat(filePathOrInstructions);
    if (stat.isDirectory()) {
      console.error(`file path can not be a directory`);
      process.exit(1);
    }
    filePathOrInstructions = await fs.readFile(filePathOrInstructions, { encoding: 'utf-8' });
  } catch (error) {
  }

  return {
    instructions: filePathOrInstructions,
    input: parsedArgs.positionals[1] ?? '',
    extended: parsedArgs.values.extended === true,
  };
}
