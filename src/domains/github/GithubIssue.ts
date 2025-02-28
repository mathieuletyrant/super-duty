export interface GithubIssueAssignee {
  username: string;
  displayName: string;
  email: string;
}

export class GithubIssue {
  public readonly id: number;
  public readonly title: string;
  public readonly body: string;
  public readonly assignee: GithubIssueAssignee;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly labels: string[];

  constructor({
    id,
    title,
    body,
    assignee,
    createdAt,
    updatedAt,
    labels,
  }: {
    id: number;
    title: string;
    body: string;
    assignee: GithubIssueAssignee;
    createdAt: Date;
    updatedAt: Date;
    labels: string[];
  }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.assignee = assignee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.labels = labels;
  }
}
