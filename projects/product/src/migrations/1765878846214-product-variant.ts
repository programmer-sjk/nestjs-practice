import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductVariant1765878846214 implements MigrationInterface {
  name = 'ProductVariant1765878846214';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_variant\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`product_id\` int NOT NULL, 
        \`sku\` varchar(64) NOT NULL, 
        \`price\` int NOT NULL, 
        \`stock\` int NOT NULL DEFAULT '0', 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        UNIQUE INDEX \`UQ_PRODUCT_VARIANT_SKU\` (\`sku\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_variant_option_value\` (
        \`variant_id\` int NOT NULL, 
        \`option_value_id\` int NOT NULL, 
        PRIMARY KEY (\`variant_id\`, \`option_value_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_ca67dd080aac5ecf99609960cd2\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variant_option_value\` ADD CONSTRAINT \`FK_1139b5de2e2e33d66527c48acbb\` FOREIGN KEY (\`variant_id\`) REFERENCES \`product_variant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variant_option_value\` ADD CONSTRAINT \`FK_1418b6295c7fdc60e0402b1d8e5\` FOREIGN KEY (\`option_value_id\`) REFERENCES \`product_option_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_variant_option_value\` DROP FOREIGN KEY \`FK_1418b6295c7fdc60e0402b1d8e5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variant_option_value\` DROP FOREIGN KEY \`FK_1139b5de2e2e33d66527c48acbb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_ca67dd080aac5ecf99609960cd2\``,
    );
    await queryRunner.query(`DROP TABLE \`product_variant_option_value\``);
    await queryRunner.query(
      `DROP INDEX \`UQ_PRODUCT_VARIANT_SKU\` ON \`product_variant\``,
    );
    await queryRunner.query(`DROP TABLE \`product_variant\``);
  }
}
