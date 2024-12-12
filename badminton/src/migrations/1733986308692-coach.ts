import { MigrationInterface, QueryRunner } from 'typeorm';

export class Coach1733986308692 implements MigrationInterface {
  name = 'Coach1733986308692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`coach\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`coach\``);
  }
}