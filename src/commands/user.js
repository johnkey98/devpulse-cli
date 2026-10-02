import chalk from 'chalk';
import { fetchUser, fetchRepos } from '../github.js';
import { fmt, divider, kv, safe } from '../utils/render.js';

export async function userCommand(username) {
  const [user, repos] = await Promise.all([fetchUser(username), fetchRepos(username)]);

  const own = repos.filter((r) => !r.fork);
  const stars = own.reduce((s, r) => s + r.stargazers_count, 0);
  const followers = user.followers ?? 0;

  console.log();
  console.log(`  ${chalk.bold.cyan(user.name || user.login)}  ${chalk.gray(`@${user.login}`)}`);
  if (user.bio) console.log(`  ${chalk.dim(user.bio)}`);
  console.log();
  divider(' PROFILE ');
  kv('Type', user.type || 'User');
  kv('Followers', chalk.bold(fmt.num(followers)));
  kv('Following', fmt.num(user.following));
  kv('Public repos', fmt.num(user.public_repos));
  kv('Total stars', chalk.yellow(`★ ${fmt.num(stars)}`));
  kv('Location', user.location || chalk.dim('—'));
  kv('Company', user.company || chalk.dim('—'));
  kv('Joined', fmt.date(user.created_at));
  kv('Profile', chalk.underline(user.html_url));
  console.log();
}
