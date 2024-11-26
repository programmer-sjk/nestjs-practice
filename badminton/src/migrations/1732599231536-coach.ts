import { MigrationInterface, QueryRunner } from 'typeorm';

export class Coach1732599231536 implements MigrationInterface {
  name = 'Coach1732599231536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`coach\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(255) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`coach\``);
  }
}
