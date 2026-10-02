import chalk from 'chalk';

/** Number formatting helpers */
export const fmt = {
  num: (n) => new Intl.NumberFormat('en').format(n ?? 0),
  date: (iso) => new Date(iso).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }),
  k: (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n ?? 0)),
};

export function divider(label = '') {
  console.log(chalk.dim(`─`.repeat(58) + (label ? ` ${label} ` : '')));
}

export function kv(key, value) {
  console.log(`  ${chalk.gray(key.padEnd(14))} ${value}`);
}

/** Unicode bar like ██████░░░░ 62% */
export function bar(share, width = 24) {
  const filled = Math.round((share / 100) * width);
  return chalk.cyan('█'.repeat(filled)) + chalk.dim('░'.repeat(width - filled));
}

export function errorBox(message) {
  console.error(`\n  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(message)}\n`);
  process.exitCode = 1;
}

export function safe(fn) {
  return async (...args) => {
    try {
      await fn(...args);
    } catch (err) {
      errorBox(err.message);
    }
  };
}
