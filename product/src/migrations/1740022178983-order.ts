import { MigrationInterface, QueryRunner } from 'typeorm';

export class Order1740022178983 implements MigrationInterface {
  name = 'Order1740022178983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`user_id\` int NOT NULL, 
        \`status\` enum ('IN_PROGRESS', 'CANCELED', 'REFUNDED', 'DONE') NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`order\``);
  }
}
