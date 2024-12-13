import { MigrationInterface, QueryRunner } from 'typeorm';

export class Customer1734077668734 implements MigrationInterface {
  name = 'Customer1734077668734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(16) NOT NULL, 
        \`account_name\` varchar(32) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`phone\` varchar(11) NOT NULL, 
        \`zip_code\` varchar(5) NOT NULL, 
        \`address\` varchar(32) NOT NULL, 
        \`address_detail\` varchar(16) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`customer\``);
  }
}
