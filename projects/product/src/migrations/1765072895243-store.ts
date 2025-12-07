import { MigrationInterface, QueryRunner } from 'typeorm';

export class Store1765072895243 implements MigrationInterface {
  name = 'Store1765072895243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`store\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`merchant_id\` int NOT NULL, 
        \`name\` varchar(64) NOT NULL, 
        \`status\` enum ('draft', 'active', 'inactive') NOT NULL, 
        \`address\` varchar(64) NULL, 
        \`address_detail\` varchar(64) NULL, 
        \`zip_code\` varchar(10) NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        INDEX \`IDX_STORE_MERCHANT_ID\` (\`merchant_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`store\` ADD CONSTRAINT \`FK_86ddc4a94ec82e28bf66d6af7fe\` FOREIGN KEY (\`merchant_id\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_86ddc4a94ec82e28bf66d6af7fe\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_STORE_MERCHANT_ID\` ON \`store\``,
    );
    await queryRunner.query(`DROP TABLE \`store\``);
  }
}
