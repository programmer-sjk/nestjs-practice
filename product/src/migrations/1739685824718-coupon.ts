import { MigrationInterface, QueryRunner } from 'typeorm';

export class Coupon1739685824718 implements MigrationInterface {
  name = 'Coupon1739685824718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`coupon\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(32) NOT NULL, 
        \`type\` enum ('PRICE', 'PERCENT') NOT NULL, 
        \`value\` int NOT NULL, 
        \`stock\` int NOT NULL, 
        \`description\` varchar(255) NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`coupon\``);
  }
}
