import { MigrationInterface, QueryRunner } from 'typeorm';

export class Store1732949182020 implements MigrationInterface {
  name = 'Store1732949182020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`store\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`address\` varchar(32) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`store\``);
  }
}
