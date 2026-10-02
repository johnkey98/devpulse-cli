#!/usr/bin/env node
import { Command } from 'commander';
import { userCommand } from '../src/commands/user.js';
import { reposCommand } from '../src/commands/repos.js';
import { langsCommand } from '../src/commands/langs.js';

const program = new Command();

program
  .name('devpulse')
  .description('Beautiful GitHub analytics right in your terminal.')
  .version('1.2.0');

program
  .command('user <username>')
  .alias('u')
  .description('Show a profile summary card for a GitHub user')
  .action(userCommand);

program
  .command('repos <username>')
  .alias('r')
  .description('List a user’s repositories ranked by stars')
  .option('-n, --limit <number>', 'number of repos to show', '10')
  .action(reposCommand);

program
  .command('langs <username>')
  .alias('l')
  .description('Show a language usage breakdown with bar charts')
  .action(langsCommand);

program.parse();
