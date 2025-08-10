import { MigrationInterface, QueryRunner } from 'typeorm';

export class Student1754623522882 implements MigrationInterface {
  name = 'Student1754623522882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "student" (
        "id" SERIAL NOT NULL, 
        "email" character varying NOT NULL, 
        "name" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP, 
        "addressStreet" character varying NOT NULL, 
        "addressCity" character varying NOT NULL, 
        "addressZipcode" character varying NOT NULL, 
        CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a56c051c91dbe1068ad683f536" ON "student" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a56c051c91dbe1068ad683f536"`,
    );
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
