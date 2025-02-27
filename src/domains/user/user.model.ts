/**
 * Represents a user in the system
 */
export interface User {
  /**
   * Username of the user (typically GitHub username)
   */
  username: string;

  /**
   * Optional display name
   */
  displayName?: string;

  /**
   * Optional email address
   */
  email?: string;
}
