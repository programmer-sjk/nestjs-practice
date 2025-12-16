import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductOption1765874760731 implements MigrationInterface {
  name = 'ProductOption1765874760731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_option_value\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`option_group_id\` int NOT NULL, 
        \`value\` varchar(64) NOT NULL, 
        \`additional_price\` int NOT NULL DEFAULT '0', 
        \`display_order\` int NOT NULL DEFAULT '0', 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_option_group\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`product_id\` int NOT NULL, 
        \`name\` varchar(32) NOT NULL, 
        \`display_order\` int NOT NULL DEFAULT '0', 
        \`is_required\` tinyint NOT NULL DEFAULT 1, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option_value\` ADD CONSTRAINT \`FK_11cbc72520f746340be342f7041\` FOREIGN KEY (\`option_group_id\`) REFERENCES \`product_option_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option_group\` ADD CONSTRAINT \`FK_28f273fec3a8f15a46494a1e5cf\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_option_group\` DROP FOREIGN KEY \`FK_28f273fec3a8f15a46494a1e5cf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option_value\` DROP FOREIGN KEY \`FK_11cbc72520f746340be342f7041\``,
    );
    await queryRunner.query(`DROP TABLE \`product_option_group\``);
    await queryRunner.query(`DROP TABLE \`product_option_value\``);
  }
}
