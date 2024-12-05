import { MigrationInterface, QueryRunner } from 'typeorm';

export class Store1733369334189 implements MigrationInterface {
  name = 'Store1733369334189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`store\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`address\` varchar(32) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`account_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`account_name\` varchar(32) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`account_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`account_name\` varchar(10) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`store\``);
  }
}
