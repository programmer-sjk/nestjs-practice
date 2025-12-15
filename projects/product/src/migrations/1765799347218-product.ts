import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1765799347218 implements MigrationInterface {
  name = 'Product1765799347218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`store_id\` int NOT NULL, 
        \`name\` varchar(64) NOT NULL, 
        \`base_price\` int NOT NULL, 
        \`description\` varchar(255) NULL, 
        \`thumbnail_url\` varchar(255) NULL, 
        \`status\` enum ('draft', 'published') NOT NULL, 
        \`category_id\` int NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        INDEX \`IDX_PRODUCT_STORE_ID_CATEGORY_ID\` (\`store_id\`, \`category_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_PRODUCT_STORE_ID_CATEGORY_ID\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
