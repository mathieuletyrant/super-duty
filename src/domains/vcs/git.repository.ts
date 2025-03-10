export interface GitRepository {
  setupWhoami({ name, email }: { name: string; email: string }): void;
  add(filePattern: string): void;
  commit(message: string): void;
  push(): void;
}
