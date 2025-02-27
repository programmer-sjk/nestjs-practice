import { MigrationInterface, QueryRunner } from 'typeorm';

export class PointHistory1740638611735 implements MigrationInterface {
  name = 'PointHistory1740638611735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`point_history\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`user_id\` int NOT NULL, \`value\` int NOT NULL, 
        \`type\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`point_history\``);
  }
}
