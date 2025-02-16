import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1739682984007 implements MigrationInterface {
  name = 'Category1739682984007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(16) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
