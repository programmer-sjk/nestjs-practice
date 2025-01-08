import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async findOne(id: number) {}

  async add(id: number) {}

  async updateName(id: number, name: string) {}

  async remove(id: number) {}
}
