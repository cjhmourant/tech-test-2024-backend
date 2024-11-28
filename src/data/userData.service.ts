import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'node:fs';

export type Cat = {
  name: string;
  subscriptionActive: string;
  breed: string;
  pouchSize: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
};

@Injectable()
export class UserDatabaseService {
  private readonly dbFilePath = join(process.cwd(), 'data.json');

  private readDbFile(): User[] {
    const data = readFileSync(this.dbFilePath, 'utf-8');
    return JSON.parse(data) as User[];
  }

  async findById(id: string) {
    return this.readDbFile().find((user) => user.id === id);
  }
}
