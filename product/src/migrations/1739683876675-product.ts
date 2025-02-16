import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1739683876675 implements MigrationInterface {
  name = 'Product1739683876675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(32) NOT NULL, 
        \`price\` int NOT NULL, 
        \`stock\` int NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
