import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1760525457390 implements MigrationInterface {
  name = 'User1760525457390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        "name" varchar NOT NULL, 
        "email" varchar NOT NULL, 
        "password" varchar NOT NULL, 
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')), 
        "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
        "deletedAt" datetime, 
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
