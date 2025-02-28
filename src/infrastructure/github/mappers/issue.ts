import { GithubIssue } from '@/domains/github';
import type { Vacation } from '@/domains/support';
import type { RestEndpointMethodTypes } from '@octokit/rest';

export type OctokitGithubIssue =
  RestEndpointMethodTypes['issues']['listForRepo']['response']['data'][0];

export const toGithubIssue = (issue: OctokitGithubIssue): GithubIssue => {
  return new GithubIssue({
    id: issue.id,
    title: issue.title,
    body: issue.body ?? '',
    assignee: {
      username: issue.assignee?.login ?? '',
      displayName: issue.assignee?.login ?? '',
      email: issue.assignee?.email ?? '',
    },
    createdAt: new Date(issue.created_at),
    updatedAt: new Date(issue.updated_at),
    labels: issue.labels.map((label) =>
      typeof label === 'string' ? label : (label.name ?? ''),
    ),
  });
};
