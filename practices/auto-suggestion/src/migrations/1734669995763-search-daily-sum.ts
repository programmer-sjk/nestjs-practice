import { MigrationInterface, QueryRunner } from 'typeorm';

export class SearchDailySum1734669995763 implements MigrationInterface {
  name = 'SearchDailySum1734669995763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`search_daily_sum\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`keyword\` varchar(255) NOT NULL, 
        \`count\` int NOT NULL, 
        \`date\` varchar(10) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`search_daily_sum\``);
  }
}
