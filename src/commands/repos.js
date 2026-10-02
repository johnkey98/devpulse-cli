import chalk from 'chalk';
import { fetchRepos } from '../github.js';
import { fmt, divider, safe } from '../utils/render.js';

export async function reposCommand(username, { limit }) {
  const repos = await fetchRepos(username);
  const own = repos.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
  const top = own.slice(0, Math.max(1, Math.min(50, +limit)));

  console.log();
  divider(` TOP ${top.length} REPOS · by stars `);
  console.log(
    `  ${chalk.gray('#'.padEnd(4))} ${chalk.gray('Repo'.padEnd(34))} ${chalk.gray('Lang'.padEnd(14))} ${chalk.gray('Stars'.padStart(7))} ${chalk.gray('Updated')}`
  );

  top.forEach((r, i) => {
    const name = (r.name.length > 32 ? r.name.slice(0, 31) + '…' : r.name).padEnd(34);
    const lang = (r.language || '—').padEnd(14);
    console.log(
      `  ${chalk.cyan(String(i + 1).padEnd(4))} ${chalk.bold(name)} ${chalk.magenta(lang)} ${chalk.yellow(fmt.k(r.stargazers_count).padStart(7))}  ${chalk.dim(fmt.date(r.updated_at))}`
    );
  });

  if (top.length === 0) {
    console.log(`  ${chalk.dim('No public (non-fork) repositories found.')}`);
  }
  console.log();
}
