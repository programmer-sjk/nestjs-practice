import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderItem1740022561146 implements MigrationInterface {
  name = 'OrderItem1740022561146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order_item\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`order_id\` int NOT NULL, 
        \`product_id\` int NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`order_item\``);
  }
}
