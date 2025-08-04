import { MigrationInterface, QueryRunner } from 'typeorm';

export class Instructor1754302849407 implements MigrationInterface {
  name = 'Instructor1754302849407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "instructor" (
        "id" SERIAL NOT NULL, 
        "email" character varying NOT NULL, 
        "name" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP, 
        CONSTRAINT "PK_ccc0348eefb581ca002c05ef2f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6222960ab4f2b68e84bc00bfee" ON "instructor" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6222960ab4f2b68e84bc00bfee"`,
    );
    await queryRunner.query(`DROP TABLE "instructor"`);
  }
}
