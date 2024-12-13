import { MigrationInterface, QueryRunner } from 'typeorm';

export class Store1734077725693 implements MigrationInterface {
  name = 'Store1734077725693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`store\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`address\` varchar(32) NOT NULL, 
        \`description\` varchar(255) NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`store\``);
  }
}
