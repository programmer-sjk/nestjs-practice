import { MigrationInterface, QueryRunner } from 'typeorm';

export class Calendar1737091943384 implements MigrationInterface {
  name = 'Calendar1737091943384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`calendar\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`title\` varchar(16) NOT NULL, 
        \`startDate\` datetime NOT NULL, 
        \`endDate\` datetime NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`calendar\``);
  }
}
