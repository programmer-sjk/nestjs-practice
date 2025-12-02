import { MigrationInterface, QueryRunner } from 'typeorm';

export class Merchant1764652208730 implements MigrationInterface {
  name = 'Merchant1764652208730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`merchant\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(100) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`business_number\` varchar(12) NOT NULL, 
        \`business_type\` enum ('individual', 'corporate') NOT NULL, 
        \`representative_name\` varchar(50) NOT NULL, 
        \`phone_number\` varchar(20) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        UNIQUE INDEX \`UQ_MERCHANT_BUSINESS_NUMBER\` (\`business_number\`), 
        UNIQUE INDEX \`UQ_MERCHANT_EMAIL\` (\`email\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`UQ_MERCHANT_EMAIL\` ON \`merchant\``);
    await queryRunner.query(
      `DROP INDEX \`UQ_MERCHANT_BUSINESS_NUMBER\` ON \`merchant\``,
    );
    await queryRunner.query(`DROP TABLE \`merchant\``);
  }
}
