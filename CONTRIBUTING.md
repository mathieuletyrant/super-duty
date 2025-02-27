# Contributing to Super Duty

Thank you for considering contributing to Super Duty! This document provides guidelines and instructions to help you contribute effectively.

## Project Architecture

Super Duty follows a Domain-Driven Design (DDD) architecture, which separates the codebase into:

- **Domains**: Business logic and rules (`src/domains/`)
- **Infrastructure**: Implementation details (`src/infrastructure/`)
- **Providers**: Utility services (`src/providers/`)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/super-duty.git`
3. Install dependencies: `pnpm install`
4. Run tests to ensure everything works: `pnpm test`

## Development Workflow

1. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `pnpm test`
4. Format your code: `pnpm format`
5. Lint your code: `pnpm lint`
6. Commit your changes with a descriptive message
7. Push to your fork and submit a pull request

## Code Style Guidelines

- Follow the TypeScript coding conventions
- Use meaningful variable and function names
- Write clear comments for complex logic
- Add JSDoc comments for public APIs
- Follow the existing project structure

## Adding New Features

When adding new features:

1. Define interfaces in the appropriate domain directory
2. Implement the interfaces in the infrastructure directory
3. Update or create tests for your implementation
4. Document your changes

## Testing

- Write unit tests for all new functionality
- Use the existing test patterns with the Given/When/Then structure
- Run tests with `pnpm test` before submitting a PR

## Documentation

- Update documentation when changing functionality
- Document public APIs with JSDoc comments
- Keep the README up to date

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if necessary
3. Describe your changes in the PR description
4. Link to any related issues
5. Wait for review and address any feedback

Thank you for contributing to Super Duty! 