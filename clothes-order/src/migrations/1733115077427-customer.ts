import { MigrationInterface, QueryRunner } from 'typeorm';

export class Customer1733115077427 implements MigrationInterface {
  name = 'Customer1733115077427';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(16) NOT NULL, \`accountName\` varchar(10) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(11) NOT NULL, \`card_number\` varchar(16) NULL, \`billingKey\` varchar(255) NULL, \`zipCode\` varchar(5) NOT NULL, \`address\` varchar(32) NOT NULL, \`addressDetail\` varchar(16) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`customer\``);
  }
}
