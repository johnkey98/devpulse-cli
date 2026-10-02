const API = 'https://api.github.com';

/**
 * GitHub REST client with optional token support.
 * Set GITHUB_TOKEN in your environment to raise the rate limit from
 * 60 to 5,000 requests/hour.
 */
async function request(path) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'devpulse-cli',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`${API}${path}`, { headers });

  if (res.status === 404) {
    throw new Error(`Not found on GitHub (404). Check the username and try again.`);
  }
  if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
    throw new Error(
      'GitHub API rate limit exceeded. Set a GITHUB_TOKEN environment variable to get 5,000 req/hour.'
    );
  }
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const fetchUser = (username) => request(`/users/${encodeURIComponent(username)}`);

export const fetchRepos = async (username) => {
  const repos = [];
  for (let page = 1; page <= 3; page++) {
    const chunk = await request(
      `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&page=${page}`
    );
    repos.push(...chunk);
    if (chunk.length < 100) break;
  }
  return repos;
};

/** Aggregate language weights from repo primary languages */
export function languageBreakdown(repos) {
  const weights = {};
  for (const r of repos) {
    if (!r.language || r.fork) continue;
    weights[r.language] = (weights[r.language] || 0) + Math.max(1, Math.round((r.stargazers_count || 0) + 1));
  }
  const total = Object.values(weights).reduce((s, w) => s + w, 0) || 1;
  return Object.entries(weights)
    .map(([lang, w]) => ({ lang, share: (w / total) * 100 }))
    .sort((a, b) => b.share - a.share);
}
