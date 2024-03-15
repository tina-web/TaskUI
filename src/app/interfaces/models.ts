import { Guid } from 'guid-typescript';

export class Task {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  createdDate: string;

  constructor(title: string, content = '') {
    this.id = Guid.create().toString();
    this.title = title;
    this.content = content;
    this.isCompleted = false;
    this.createdDate = new Date(Date.now()).toISOString();
  }
}
