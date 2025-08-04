import { MigrationInterface, QueryRunner } from 'typeorm';

export class Course1754302488556 implements MigrationInterface {
  name = 'Course1754302488556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course" (
        "id" SERIAL NOT NULL, 
        "title" character varying NOT NULL, 
        "instructorId" integer NOT NULL, 
        "description" character varying NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP, 
        CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" 
        PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course"`);
  }
}
