import chalk from 'chalk';
import { fetchRepos, languageBreakdown } from '../github.js';
import { divider, bar, safe } from '../utils/render.js';

export async function langsCommand(username) {
  const repos = await fetchRepos(username);
  const breakdown = languageBreakdown(repos).slice(0, 10);

  console.log();
  divider(` LANGUAGE BREAKDOWN · @${username} `);
  for (const { lang, share } of breakdown) {
    console.log(`  ${lang.padEnd(18)} ${bar(share)} ${chalk.bold(share.toFixed(1).padStart(5))}%`);
  }
  if (breakdown.length === 0) {
    console.log(`  ${chalk.dim('No primary languages found across non-fork repos.')}`);
  }
  console.log();
}
