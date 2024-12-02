import { MigrationInterface, QueryRunner } from 'typeorm';

export class Billing1733115242719 implements MigrationInterface {
  name = 'Billing1733115242719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`billing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderId\` int NOT NULL, \`billingKey\` varchar(16) NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`billing\``);
  }
}
