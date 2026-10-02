# ⌨️ DevPulse CLI — GitHub Analytics in Your Terminal

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/Node-18+-339933?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/install%20with-npm-cb3837?logo=npm&logoColor=white)

DevPulse turns the GitHub REST API into beautiful, colorful terminal reports. In one command you get a **profile summary card** (followers, total stars, join date), a **star-ranked repository table**, and an **ASCII language breakdown** with proportional bar charts. It is a real, publishable npm package with a proper `bin` entry — `npm install -g devpulse-cli` and anyone can run `devpulse user torvalds`.

The client handles the real-world details other demo CLIs skip: pagination across up to 300 repos, friendly 404 messages, explicit rate-limit guidance when you hit the unauthenticated ceiling, and an optional `GITHUB_TOKEN` that lifts you to 5,000 requests/hour.

<!-- 📸 Add a terminal screenshot here: ![Demo](screenshots/demo.png) -->

## ✨ Features

- `devpulse user <username>` — profile card: bio, followers, star total, location, join date.
- `devpulse repos <username> [-n 10]` — top repositories ranked by stars with language, star count and last-update columns.
- `devpulse langs <username>` — weighted language breakdown with Unicode bar charts (forks excluded, stars weighted).
- **Token-aware client** — respects `GITHUB_TOKEN`, detects `403` rate-limit responses and explains the fix instead of dumping a stack trace.
- **Zero-config install** — plain ESM, only two runtime dependencies (`commander`, `chalk`).

## 📦 Install

```bash
# from a local clone
git clone https://github.com/johnkey98/devpulse-cli.git
cd devpulse-cli
npm install
npm link          # exposes the `devpulse` command globally

# or run directly without installing
node bin/index.js user octocat
```

## 🚀 Usage

```bash
devpulse user johnkey98       # profile summary card
devpulse repos johnkey98      # top 10 repos by stars
devpulse repos vercel -n 5    # top 5
devpulse langs johnkey98      # language breakdown

# avoid rate limits (5,000 req/h instead of 60)
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

### Example output

```
  John Key  @johnkey98
  Full-stack developer building clean web products.

  ────────────────────────────────────── PROFILE ─
  Followers      128
  Public repos   12
  Total stars    ★ 342
  Joined         Sep 27, 2026
```

## 📂 Project Structure

```
devpulse-cli/
├── bin/index.js          # commander entry point (bin)
└── src/
    ├── github.js         # REST client: pagination, errors, token
    ├── utils/render.js   # chalk helpers, bars, error box
    └── commands/
        ├── user.js
        ├── repos.js
        └── langs.js
```

## 🗺 Roadmap

- [ ] `devpulse compare <a> <b>` side-by-side comparison
- [ ] `devpulse streak <username>` contribution streaks (GraphQL)
- [ ] JSON/CSV export flags
- [ ] Publish to the npm registry

## 📄 License

[MIT](LICENSE) © [John Key](https://github.com/johnkey98)
