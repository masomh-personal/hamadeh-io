# ThoughtfulCode

A modern, performance-focused portfolio website showcasing software engineering skills, LeetCode
solutions, algorithms, data structures, and technical writing.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** React 19
- **Runtime:** Bun v1.3.x
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Bun test runner
- **Linting:** ESLint
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged

## Getting Started

### Prerequisites

- Bun v1.3.x or later
- Git

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
bun start
```

### Testing

```bash
# Run tests
bun test

# Run tests with coverage
bun test --coverage
```

### Code Quality

```bash
# Lint
bun run lint

# Format code
bun run format

# Type check
bun run type-check
```

## Project Structure

```
thoughtfulcode-app/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities and helpers
├── content/          # MDX content files
├── public/           # Static assets
└── tests/            # Test files
```

## Git Hooks

Pre-commit hooks automatically:

- Format code with Prettier
- Run ESLint fixes

Pre-push hooks automatically:

- Run TypeScript type checking
- Run ESLint

## License

Private project
