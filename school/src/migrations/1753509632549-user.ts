import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1753509632549 implements MigrationInterface {
  name = 'User1753509632549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" SERIAL NOT NULL, 
        "email" character varying NOT NULL, 
        "name" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP, "addressStreet" character varying NOT NULL, 
        "addressCity" character varying NOT NULL, 
        "addressZipcode" character varying NOT NULL, 
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
