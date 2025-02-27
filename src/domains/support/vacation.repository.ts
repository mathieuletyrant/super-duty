import type { User } from '../user/user.model';

/**
 * Interface representing a vacation period
 */
export interface Vacation {
  user: User;
  startDate: Date;
  endDate: Date;
  reason?: string;
}

/**
 * Repository interface for managing releases and vacations
 */
export interface VacationRepository {
  /**
   * Get all vacations for a specific user
   * @param user The user to get vacations for
   * @returns Promise with an array of vacations
   */
  getUserVacations(user: User): Promise<Vacation[]>;

  /**
   * Get all vacations for all users
   * @returns Promise with an array of vacations
   */
  getAllVacations(): Promise<Vacation[]>;

  /**
   * Check if a user is on vacation on a specific date
   * @param user The user to check
   * @param date The date to check
   * @returns Promise with boolean indicating if user is on vacation
   */
  isUserOnVacation(user: User, date: Date): Promise<boolean>;

  /**
   * Create a new vacation for a user
   * @param vacation The vacation details
   * @returns Promise with the created vacation
   */
  createVacation(vacation: Vacation): Promise<Vacation>;

  /**
   * Update an existing vacation
   * @param id The vacation ID
   * @param vacation The updated vacation details
   * @returns Promise with the updated vacation
   */
  updateVacation(id: string, vacation: Partial<Vacation>): Promise<Vacation>;

  /**
   * Delete a vacation
   * @param id The vacation ID
   * @returns Promise indicating success
   */
  deleteVacation(id: string): Promise<boolean>;
}
