import type { ConfigurationRepository } from '@/domains/configuration';
import type { Vacation, VacationRepository } from '@/domains/support';
import type { User } from '@/domains/user/user.model';
import type { Octokit } from '@octokit/rest';

import type { GithubIssue } from '@/domains/github';
import { toGithubIssue } from './mappers/issue';

/**
 * Implementation of VacationRepository using GitHub issues
 */
export class GitHubIssuesRepository implements VacationRepository {
  private githubClient: Octokit;
  private owner: string;
  private repo: string;
  private vacationLabelName = 'vacation';

  constructor(githubClient: Octokit, config: ConfigurationRepository) {
    this.githubClient = githubClient;
    this.owner = config.getConfig().GITHUB_OWNER;
    this.repo = config.getConfig().GITHUB_REPO;
  }

  /**
   * Ensures the vacation label exists in the repository
   */
  private async ensureVacationLabel(): Promise<void> {
    try {
      await this.githubClient.issues.getLabel({
        owner: this.owner,
        repo: this.repo,
        name: this.vacationLabelName,
      });
    } catch (error) {
      // Label doesn't exist, create it
      await this.githubClient.issues.createLabel({
        owner: this.owner,
        repo: this.repo,
        name: this.vacationLabelName,
        color: '5319e7', // Purple color for vacation
        description: 'Indicates a user is on vacation',
      });
    }
  }

  private parseVacationDates(
    body: string,
  ): { startDate: Date; endDate: Date } | null {
    // Look for date format like "Start: YYYY-MM-DD, End: YYYY-MM-DD"
    const dateRegex =
      /Start:\s*(\d{4}-\d{2}-\d{2})[\s,]+End:\s*(\d{4}-\d{2}-\d{2})/i;
    const match = body.match(dateRegex);

    if (match && match.length === 3) {
      const startDate = new Date(match[1]);
      const endDate = new Date(match[2]);

      if (
        !Number.isNaN(startDate.getTime()) &&
        !Number.isNaN(endDate.getTime())
      ) {
        return { startDate, endDate };
      }
    }

    return null;
  }

  private toVacation(issue: GithubIssue): Vacation | null {
    // Check if issue has vacation label
    const hasVacationLabel = issue.labels.some(
      (label) => label === this.vacationLabelName,
    );

    if (!hasVacationLabel) {
      return null;
    }

    const dates = this.parseVacationDates(issue.body || '');
    if (!dates) {
      return null;
    }

    // Extract username from issue title or assignee
    let username = '';
    if (issue.assignee) {
      username = issue.assignee.username;
    } else {
      // Try to extract username from title like "Vacation: username"
      const titleMatch = issue.title.match(/Vacation:\s*(\S+)/i);
      if (titleMatch && titleMatch.length > 1) {
        username = titleMatch[1];
      }
    }

    if (!username) {
      return null;
    }

    return {
      user: {
        username: issue.assignee.username,
        displayName: issue.assignee.displayName,
        email: issue.assignee.email,
      },
      startDate: dates.startDate,
      endDate: dates.endDate,
      reason: issue.body ?? '',
    };
  }

  async getUserVacations(user: User): Promise<Vacation[]> {
    await this.ensureVacationLabel();

    const issues = await this.githubClient.issues.listForRepo({
      owner: this.owner,
      repo: this.repo,
      labels: this.vacationLabelName,
      state: 'open',
    });

    return issues.data
      .filter((issue) => {
        // Check if issue is assigned to the user or has user in title
        const isAssignedToUser = issue.assignee?.login === user.username;
        const hasTitleWithUser = issue.title
          .toLowerCase()
          .includes(user.username.toLowerCase());
        return isAssignedToUser || hasTitleWithUser;
      })
      .map((issue) => toGithubIssue(issue))
      .map((issue) => this.toVacation(issue))
      .filter((vacation): vacation is Vacation => vacation !== null);
  }

  async getAllVacations(): Promise<Vacation[]> {
    await this.ensureVacationLabel();

    const issues = await this.githubClient.issues.listForRepo({
      owner: this.owner,
      repo: this.repo,
      labels: this.vacationLabelName,
      state: 'open',
    });

    return issues.data
      .map((issue) => toGithubIssue(issue))
      .map((issue) => this.toVacation(issue))
      .filter((vacation): vacation is Vacation => vacation !== null);
  }

  async isUserOnVacation(user: User, date: Date): Promise<boolean> {
    const vacations = await this.getUserVacations(user);

    return vacations.some(
      (vacation) => date >= vacation.startDate && date <= vacation.endDate,
    );
  }

  async createVacation(vacation: Vacation): Promise<Vacation> {
    await this.ensureVacationLabel();

    const startDateStr = vacation.startDate.toISOString().split('T')[0];
    const endDateStr = vacation.endDate.toISOString().split('T')[0];

    const body = `Start: ${startDateStr}, End: ${endDateStr}\n\n${vacation.reason || ''}`;

    const response = await this.githubClient.issues.create({
      owner: this.owner,
      repo: this.repo,
      title: `Vacation: ${vacation.user.username}`,
      body,
      labels: [this.vacationLabelName],
      assignees: [vacation.user.username],
    });

    return {
      ...vacation,
      id: response.data.number.toString(),
    } as Vacation;
  }

  async updateVacation(
    id: string,
    vacationUpdate: Partial<Vacation>,
  ): Promise<Vacation> {
    const issueNumber = Number.parseInt(id, 10);

    // Get current issue to merge with updates
    const currentIssue = await this.githubClient.issues.get({
      owner: this.owner,
      repo: this.repo,
      issue_number: issueNumber,
    });

    const currentVacation = this.toVacation(toGithubIssue(currentIssue.data));
    if (!currentVacation) {
      throw new Error(`Issue #${id} is not a valid vacation`);
    }

    // Merge current vacation with updates
    const updatedVacation = {
      ...currentVacation,
      ...vacationUpdate,
    };

    const startDateStr = updatedVacation.startDate.toISOString().split('T')[0];
    const endDateStr = updatedVacation.endDate.toISOString().split('T')[0];

    const body = `Start: ${startDateStr}, End: ${endDateStr}\n\n${updatedVacation.reason || ''}`;

    await this.githubClient.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: issueNumber,
      body,
      assignees: [updatedVacation.user.username],
    });

    return updatedVacation;
  }

  async deleteVacation(id: string): Promise<boolean> {
    const issueNumber = Number.parseInt(id, 10);

    // We don't actually delete the issue, just close it
    await this.githubClient.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: issueNumber,
      state: 'closed',
    });

    return true;
  }
}
