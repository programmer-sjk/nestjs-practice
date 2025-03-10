import { MigrationInterface, QueryRunner } from 'typeorm';

export class PointHistoryDetail1741329647152 implements MigrationInterface {
  name = 'PointHistoryDetail1741329647152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`point_history_detail\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`user_id\` int NOT NULL, 
        \`status\` varchar(255) NOT NULL, 
        \`value\` int NOT NULL, 
        \`detail_history_id\` int NOT NULL,
        \`point_history_id\` int NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        INDEX \`userId\` (\`user_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point_history\` ADD \`status\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point_history\` ADD \`memo\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`point_history\` DROP COLUMN \`memo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`point_history\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `DROP INDEX \`userId\` ON \`point_history_detail\``,
    );
    await queryRunner.query(`DROP TABLE \`point_history_detail\``);
  }
}
